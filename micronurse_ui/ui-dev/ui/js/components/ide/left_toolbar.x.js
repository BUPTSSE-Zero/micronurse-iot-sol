/******************************************************************************
Copyright (c) 2016, Intel Corporation

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of Intel Corporation nor the names of its contributors
      may be used to endorse or promote products derived from this software
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*****************************************************************************/
import Tbb from "../common/toolbar_button.x";

export default class LeftToolbar extends ReactComponent {

  /*_on_change_theme() {
    var theme = $hope.app.stores.ide.theme === "hope-theme-dark" ? 
                            "hope-theme-light" : "hope-theme-dark";
    $hope.trigger_action("ide/change/theme", {theme: theme});
  }*/

  _on_undo() {
    var view = $hope.app.stores.graph.active_view;
    $hope.trigger_action("graph/undo", {graph_id: view.id});
  }

  _on_redo() {
    var view = $hope.app.stores.graph.active_view;
    $hope.trigger_action("graph/redo", {graph_id: view.id});
  }

  _on_save() {
    var view = $hope.app.stores.graph.active_view;
    if (view.has_linter_error()) {
      $hope.confirm(__("Save to Server"),
        __("This workflow looks like contain error(s), are you sure to deploy it on the server?"),
        "warning", res => {
        if (!res) {
          $hope.trigger_action("graph/save", {});
        }
      }, {
        cancelButtonText: __("Save"),
        confirmButtonText: __("Cancel and back to edit")
      });
    }
    else {
      $hope.confirm(__("Save to Server"),
        __("This would create or overwrite the workflow deployed on the server. Please make sure this is what you expect!"),
        "warning", () => {
        $hope.trigger_action("graph/save", {});
      });
    }
  }

  _on_fit() {
    var view = $hope.app.stores.graph.active_view;
    $hope.trigger_action("graph/fit", {graph_id: view.id});
  }

  _on_autolayout() {
    var view = $hope.app.stores.graph.active_view;
    $hope.trigger_action("graph/autolayout", {graph_id: view.id});
  }

  run(trace) {
    var view = $hope.app.stores.graph.active_view;

    view.tracing = trace;
    view.debug_traces = [];

    if (view.modified) {
      if (view.has_linter_error()) {
        $hope.alert(__("Save and Run"),
          __("This workflow looks like contain error(s), unable to deploy and start it?"),
          "error");
      }
      else {
        $hope.confirm(__("Save and Run"), 
          __("This would create or overwrite the workflow deployed on the server. Please make sure this is what you expect!"),
          "warning", () => {
          $hope.trigger_action("graph/save_and_start", {});
        });
      }
    }
    else {
      if (view.has_linter_error()) {
        $hope.alert(__("Run"),
          __("This workflow looks like contain error(s), unable to start it?"),
          "error");
      }
      else {
        $hope.trigger_action("graph/start", {
          graphs: [view.id],
          tracing: trace
        });
      }
    }
  }

  _on_stop() {
    var view = $hope.app.stores.graph.active_view;

    if (view.is_debugging()) {
      $hope.trigger_action("graph/stop_replay", {});
    }
    else {
      $hope.trigger_action("graph/stop", {
        graphs: [view.id]
      });
    }
  }

  _on_step(type) {
    var view = $hope.app.stores.graph.active_view;
    $hope.trigger_action("graph/step", {graph_id: view.id, type: type});
  }

  render() {
    var view = $hope.app.stores.graph.active_view;
    if (!view) {
      return <div className="hope-left-toolbar" />;
    }

    var undo_stack_len = view.undo_stack.length;
    var undo_times = view.undo_times;

    var fit = <Tbb icon="arrows-alt"
        tips={__("Click to fit the view")}
        onClick={this._on_fit} />;

    if (view.is_running()) {
      return (
        <div className="hope-left-toolbar">
          <Tbb icon="stop" tips={__("Click to stop the workflow")} onClick={this._on_stop} />
          {fit}
        </div>
      );
    }

    if (view.is_debugging()) {
      var logs = view.$logs;
      var idx = view.$logidx || 0;
      var len = logs ? logs.length : 0;
      return (
        <div className="hope-left-toolbar">
          <Tbb icon="circle-o-notch" tips={__("Click to stop the workflow")} onClick={this._on_stop} />
          <Tbb icon="arrow-circle-right" tips={__("Continue")} onClick={this._on_step.bind(this, "go")} enabled={!view.is_auto_replaying()} />
          <Tbb icon="step-forward" tips={__("Step forward")} onClick={this._on_step.bind(this, "step")} enabled={logs && idx < len - 1} />
          <Tbb icon="step-backward" tips={__("Step backward")} onClick={this._on_step.bind(this, "back")} enabled={logs && idx > 0} />
          <Tbb icon="fast-backward" tips={__("Back to the beginning")} onClick={this._on_step.bind(this, "begin")} enabled={logs && idx !== 0} />
        </div>
      );
    }

    return (
      <div className="hope-left-toolbar">
        <Tbb icon="play" tips={__("Click to run the workflow")} onClick={this.run.bind(this, false)} />
        <Tbb icon="bug" tips={__("Click to run the workflow with tracing")} onClick={this.run.bind(this, true)} />
        <Tbb icon="floppy-o" tips={__("Click to save the workflow")} onClick={this._on_save} enabled={view && view.modified} />
        <Tbb icon="undo" tips={__("Undo")} onClick={this._on_undo} enabled={undo_stack_len > undo_times} />
        <Tbb icon="repeat" tips={__("Redo")} onClick={this._on_redo} enabled={undo_times > 0} />
        {fit}
        <Tbb icon="sitemap" tips={__("Click to auto layout the workflow")} onClick={this._on_autolayout} />
      </div>
    );
  }
}

