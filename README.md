# routing-pipe
It's very annoying to call routes in an angular app by it's full name espacially when the app starts to grow because in this case changing a route will be a pure pain.
so inspired from symfony's routing system, this pipe will make it much easier to work with routes by simply naming them.

```javascript
@NgModule({
  declarations: [RoutingPipe]// import the pipe
  imports: [
    RouterModule.forRoot([
      { path: 'my/full/path', component: AcmeComponent, data: { name: 'my_path_name'}},// just add the "name" attribut within the data object of the route
    ])
  ],
  providers: [RoutingPipe]// add it here if you want to inject it in some components
})
export class AppModule { }
```

Now after naming our route, here is how to use it:<br>
inside `some.component.html`:
```html
<a [routerLink]="'my_path_name'|path">my path</a>
```
inside `some.component.ts`:
```javascript
export class SomeComponent implements OnInit {

  constructor(private _router: RoutingPipe) { }

  ngOnInit() {
  }
  
  navigateToSomePathAfterAction(){
     this._router.navigate('my_path_name');
  }

}
```
Now I know what you're thinking<br>
how can we use it with dynamic data in the route ?<br>
well good question but worry not :smile:<br>

```javascript
@NgModule({
  declarations: [RoutingPipe]// import the pipe
  imports: [
    RouterModule.forRoot([
      { path: 'my/full/path/:id/acme/:action', component: AcmeComponent, data: { name: 'my_path_name'}},// just add the "name" attribut within the data object of the route
    ])
  ],
  providers: [RoutingPipe]// add it here if you want to inject it in some components
})
export class AppModule { }
```

inside `some.component.html`:
```html
<a [routerLink]="'my_path_name'|path:{id:'1', action:'show'}">my path</a>
```
inside `some.component.ts`:
```javascript
export class SomeComponent implements OnInit {

  constructor(private _router: RoutingPipe) { }

  ngOnInit() {
  }
  
  navigateToSomePathAfterAction(){
     this._router.navigate('my_path_name', {id:'1', action:'show'});
  }

}
```

or simply if you want to get the path (not navigate to it) you can call the `transform()` function like so:
```javascript
let path = this._router.navigate('my_path_name', {id:'1', action:'show'});
```

If you have any thoughts or improvments please feel free to open an issue or pull request.
