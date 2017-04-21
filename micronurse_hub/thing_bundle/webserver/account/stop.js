hub_shared.user = undefined;
if(shared.account.auto_login_timer)
  clearTimeout(shared.account.auto_login_timer);
if(shared.account.logout_timer)
  clearTimeout(shared.account.logout_timer);
done();
