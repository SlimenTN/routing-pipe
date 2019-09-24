import { Pipe, PipeTransform } from '@angular/core';
import { Router, Route } from '@angular/router';
import {isUndefined} from "util";

@Pipe({
  name: 'path'
})
export class RoutingPipe implements PipeTransform {
  private _path: string = null;
  constructor(
    private _router: Router
  ){}

  transform(_route_name: any, params?: {}): any {
    this._path = null;
    this.findPath(this._router.config, _route_name);
    if(this._path == null) throw new Error('No path found for name "'+_route_name+'"!');
    if(params){
      for (let k in params) {
        if (params.hasOwnProperty(k)) {
           this._path = this._path.replace(`:${k}`, params[k]);
        }
      }
    }
    return this._path;
  }

  /**
   * navigate to component by route name
   *
   * @param name route name
   * @param params route params if exist
   */
  navigate(name: string, params?: {}, queryParams?: {}){
    this._router.navigate([this.transform(name, params)], queryParams);
  }

  /**
   * Find route's full path by name
   *
   * @param config routes
   * @param name route name
   * @param parent
   */
  findPath(config: Route[], name: String, parent?: string) {
    parent = parent || '';

    for (let i = 0; i < config.length; i++) {
      const route: Route = config[i];
      const path = parent + '/' + route.path;
      if (route.children) {
        // this._path = null;
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.findPath(route.children, name, currentPath);
      }else{
        if(!isUndefined(route.data) && (<any>route.data).name == name){
          this._path = path;
        }
      }
    }
  }

}
