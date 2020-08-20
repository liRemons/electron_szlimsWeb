!macro preInit
      SetRegView 64
      WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\Local\Programs\szlims-winappTest"
      WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\Local\Programs\szlims-winappTest"
      SetRegView 32
      WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\Local\Programs\szlims-winappTest"
      WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\Local\Programs\szlims-winappTest"
!macroend