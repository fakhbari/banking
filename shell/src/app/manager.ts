//@ts-noCheck
import axios from "axios";
import * as React from "react";
import {importRemote} from "@module-federation/utilities";

export const getPluginsInManager = ()=>{
  return axios.get('http://localhost:7000/plugins')
    .then(resp => {
      const receivedPlugin = resp.data;
      const pluginsRoute = receivedPlugin && receivedPlugin.map(plugin =>{
        return {
          path:`/${plugin.scope}`,
          component:React.lazy(() => importRemote({
              url:plugin.url,
              scope:plugin.scope,
              module:plugin.module,
            }).catch(() => {
              return { default: () => 'module is not working!' };
              })),
            icon:plugin.icon,
          title:plugin.title
      }
      })
      return pluginsRoute
    })
    .catch(error => {
      console.log(error);
    });

}
