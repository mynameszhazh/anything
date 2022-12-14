/**
 * 处理路由文件和菜单的映射 
 * @param {object[]} routesMeaus 
 * @param {object[]} routes 
 */
export const parseRoutes = function (routesMeaus, routes) {
  for(let i=0; i<routes.length; i++) {
      if(routes[i].redirect) continue
      let tempObj = {
        children: [],
        name: ''
      }
      if(routes[i].children) {
        parseRoutes(tempObj.children, routes[i].children)
      } 
      tempObj.name = routes[i].name
      routesMeaus.push(tempObj)
    }
}