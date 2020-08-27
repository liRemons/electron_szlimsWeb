!macro preInit
      SetRegView 64
      WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
      WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
      SetRegView 32
      WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
      WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
!macroend