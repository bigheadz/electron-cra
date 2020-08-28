netsh advfirewall firewall delete rule name=%1
netsh advfirewall firewall add rule name=%1 dir=in program=%2 action=allow
netsh advfirewall firewall add rule name=%1 dir=out program=%2 action=allow