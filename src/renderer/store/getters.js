const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  taskId: state => state.app.taskId,
  isConnect: state => state.app.isConnect,
  info: state => state.app.info,
  pinpu: state => state.app.pinpu,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  menuState: state => state.app.menuState,
  templateAction: state => state.app.templateAction,
  labtemplate: state => state.laboratory.labtemplate,
  hasReviewData: state => state.laboratory.hasReviewData,
  analysisData: state => state.laboratory.analysisData,
  inspectionTime:state=>state.laboratory.inspectionTime,
  inputNum: state => state.drone.inputNum
}
export default getters
