!macro customInstall
  # ExecWait '"$INSTDIR\bonjoursdksetup.exe"'
  # ExecWait '"$INSTDIR\QLink imageViewer Setup.exe" /q:a'
  
  # nsExec::Exec '"$INSTDIR\firewall.bat" "QlinkV Server" "$INSTDIR\resources\app.asar.unpacked\services\vc\qlinkvserver.exe"'
!macroend