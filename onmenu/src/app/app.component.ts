import { Component } from '@angular/core';


// // function log(target, name , descriptor){
// //   console.log(target, name , descriptor)

// //   const original = descriptor.value;
// //   // descriptor.value = function(){
// //   //   console.log("this function is hacked");
// //   // }

// //   // original()
// //   descriptor.value = function(...args){
// //     console.log("Arguments", args ,"were pass in this function")
// //     const result = original.apply(this , args);
// //     console.log("the result function is ", result)
// //     return result
// //   }

//   return descriptor
// }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onmenu';

  // constructor(){
  //  console.log("thisn statement is fired by constructor" ,this.aSimpleMethod(5))
  // }
  // @log
  // aSimpleMethod(a){
  //   return a*a
  // }
}
