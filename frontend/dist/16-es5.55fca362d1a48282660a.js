function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"+P1L":function(e,t,n){"use strict";n.r(t);var r,o,a,s=n("3Pt+"),i=n("RS3s"),l=n("vTDv"),u=n("tyNb"),m=n("fXoL"),c=((r=function e(){_classCallCheck(this,e)}).\u0275fac=function(e){return new(e||r)},r.\u0275cmp=m["\u0275\u0275defineComponent"]({type:r,selectors:[["ngx-users"]],decls:1,vars:0,template:function(e,t){1&e&&m["\u0275\u0275element"](0,"router-outlet")},directives:[u.h],encapsulation:2}),r),d=n("HDdC"),h=n("XNiG"),g=n("1G5W"),p=n("2NI8"),f=n("Cgdg"),b=n("McNs"),C=n("dwCd"),v=n("aceb"),y=n("6edl"),w=function(e){return e.VIEW="View",e.EDIT="Edit",e.ADD="Add",e.EDIT_SELF="EditSelf",e}({}),M=((o=function(){function e(t,n,r,o,a,s,i){_classCallCheck(this,e),this.usersService=t,this.router=n,this.route=r,this.tokenService=o,this.userStore=a,this.toasterService=s,this.fb=i,this.unsubscribe$=new h.a}return _createClass(e,[{key:"setViewMode",value:function(e){this.mode=e}},{key:"ngOnInit",value:function(){this.initUserForm(),this.loadUserData()}},{key:"initUserForm",value:function(){this.userForm=this.fb.group({id:this.fb.control(""),role:this.fb.control(""),firstName:this.fb.control("",[s.z.minLength(3),s.z.maxLength(20)]),lastName:this.fb.control("",[s.z.minLength(3),s.z.maxLength(20)]),login:this.fb.control("",[s.z.required,s.z.minLength(6),s.z.maxLength(20)]),age:this.fb.control("",[s.z.required,s.z.min(1),s.z.max(120),s.z.pattern(f.b)]),email:this.fb.control("",[s.z.required,s.z.pattern(f.a)]),address:this.fb.group({street:this.fb.control(""),city:this.fb.control(""),zipCode:this.fb.control("")})})}},{key:"loadUserData",value:function(){var e=this.route.snapshot.paramMap.get("id");if(this.route.snapshot.queryParamMap.get("profile"))this.setViewMode(w.EDIT_SELF),this.loadUser();else if(e){var t=this.userStore.getUser().id;this.setViewMode(t.toString()===e?w.EDIT_SELF:w.EDIT),this.loadUser(e)}else this.setViewMode(w.ADD)}},{key:"loadUser",value:function(e){var t=this;(this.mode===w.EDIT_SELF?this.usersService.getCurrentUser():this.usersService.get(e)).pipe(Object(g.a)(this.unsubscribe$)).subscribe((function(e){t.userForm.setValue({id:e.id?e.id:"",role:e.role?e.role:"",firstName:e.firstName?e.firstName:"",lastName:e.lastName?e.lastName:"",login:e.login?e.login:"",age:e.age?e.age:"",email:e.email,address:{street:e.address&&e.address.street?e.address.street:"",city:e.address&&e.address.city?e.address.city:"",zipCode:e.address&&e.address.zipCode?e.address.zipCode:""}})}))}},{key:"convertToUser",value:function(e){return e}},{key:"save",value:function(){var e=this,t=this.convertToUser(this.userForm.value),n=new d.a;this.mode===w.EDIT_SELF?this.usersService.updateCurrent(t).subscribe((function(t){e.tokenService.set(new b.f(t,"email",new Date)),e.handleSuccessResponse()}),(function(t){e.handleWrongResponse()})):n=t.id?this.usersService.update(t):this.usersService.create(t),n.pipe(Object(g.a)(this.unsubscribe$)).subscribe((function(){e.handleSuccessResponse()}),(function(t){e.handleWrongResponse()}))}},{key:"handleSuccessResponse",value:function(){this.toasterService.success("","Item ".concat(this.mode===w.ADD?"created":"updated","!")),this.back()}},{key:"handleWrongResponse",value:function(){this.toasterService.danger("","This email has already taken!")}},{key:"back",value:function(){this.router.navigate(["/pages"])}},{key:"ngOnDestroy",value:function(){this.unsubscribe$.next(),this.unsubscribe$.complete()}},{key:"firstName",get:function(){return this.userForm.get("firstName")}},{key:"lastName",get:function(){return this.userForm.get("lastName")}},{key:"login",get:function(){return this.userForm.get("login")}},{key:"email",get:function(){return this.userForm.get("email")}},{key:"age",get:function(){return this.userForm.get("age")}},{key:"street",get:function(){return this.userForm.get("address").get("street")}},{key:"city",get:function(){return this.userForm.get("address").get("city")}},{key:"zipCode",get:function(){return this.userForm.get("address").get("zipCode")}},{key:"canEdit",get:function(){return this.mode!==w.VIEW}}]),e}()).\u0275fac=function(e){return new(e||o)(m["\u0275\u0275directiveInject"](p.a),m["\u0275\u0275directiveInject"](u.c),m["\u0275\u0275directiveInject"](u.a),m["\u0275\u0275directiveInject"](b.j),m["\u0275\u0275directiveInject"](C.a),m["\u0275\u0275directiveInject"](v.dc),m["\u0275\u0275directiveInject"](s.d))},o.\u0275cmp=m["\u0275\u0275defineComponent"]({type:o,selectors:[["ngx-user"]],decls:47,vars:21,consts:[[1,"container",3,"formGroup"],[1,"form-group"],["for","firstName"],["nbInput","","id","firstName","formControlName","firstName","placeholder","Last Name",1,"form-control",3,"status"],["label","First Name","minLength","3","maxLength","20",3,"showMinLength","showMaxLength"],["for","lastName"],["nbInput","","id","lastName","formControlName","lastName","placeholder","Last Name",1,"form-control",3,"status"],["label","Last Name","minLength","3","maxLength","20",3,"showMinLength","showMaxLength"],["for","inputLogin"],["nbInput","","id","inputLogin","formControlName","login","placeholder","Login",1,"form-control",3,"status"],["label","Login","minLength","6","maxLength","20",3,"showMinLength","showMaxLength","showRequired"],["for","inputAge"],["nbInput","","id","inputAge","formControlName","age","placeholder","Age",1,"form-control",3,"status"],["label","Age","min","1","max","120",3,"showMin","showMax","showRequired","showPattern"],["for","inputEmail"],["nbInput","","id","inputEmail","formControlName","email","placeholder","Email",1,"form-control",3,"status"],["label","Email","min","1","max","120",3,"showPattern","showRequired"],["formGroupName","address",1,"form-group"],["for","inputStreet"],["nbInput","","id","inputStreet","placeholder","Street","formControlName","street",1,"form-control"],["for","inputCity"],["nbInput","","id","inputCity","placeholder","City","formControlName","city",1,"form-control"],["for","inputZipCode"],["nbInput","","id","inputZipCode","placeholder","Zip Code","formControlName","zipCode",1,"form-control"],["nbButton","","status","primary","hero","",3,"disabled","click"],["nbButton","","status","info","hero","",3,"click"]],template:function(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"nb-card"),m["\u0275\u0275elementStart"](1,"nb-card-header"),m["\u0275\u0275text"](2),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"nb-card-body"),m["\u0275\u0275elementStart"](4,"div",0),m["\u0275\u0275elementStart"](5,"div",1),m["\u0275\u0275elementStart"](6,"label",2),m["\u0275\u0275text"](7,"First Name"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](8,"input",3),m["\u0275\u0275element"](9,"ngx-validation-message",4),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](10,"div",1),m["\u0275\u0275elementStart"](11,"label",5),m["\u0275\u0275text"](12,"Last Name"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](13,"input",6),m["\u0275\u0275element"](14,"ngx-validation-message",7),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](15,"div",1),m["\u0275\u0275elementStart"](16,"label",8),m["\u0275\u0275text"](17,"Login"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](18,"input",9),m["\u0275\u0275element"](19,"ngx-validation-message",10),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](20,"div",1),m["\u0275\u0275elementStart"](21,"label",11),m["\u0275\u0275text"](22,"Age"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](23,"input",12),m["\u0275\u0275element"](24,"ngx-validation-message",13),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](25,"div",1),m["\u0275\u0275elementStart"](26,"label",14),m["\u0275\u0275text"](27,"Email"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](28,"input",15),m["\u0275\u0275element"](29,"ngx-validation-message",16),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](30,"div",17),m["\u0275\u0275elementStart"](31,"label",18),m["\u0275\u0275text"](32,"Street"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](33,"input",19),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](34,"div",17),m["\u0275\u0275elementStart"](35,"label",20),m["\u0275\u0275text"](36,"City"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](37,"input",21),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](38,"div",17),m["\u0275\u0275elementStart"](39,"label",22),m["\u0275\u0275text"](40,"Zip Code"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](41,"input",23),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](42,"nb-card-footer"),m["\u0275\u0275elementStart"](43,"button",24),m["\u0275\u0275listener"]("click",(function(){return t.save()})),m["\u0275\u0275text"](44,"Submit"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](45,"button",25),m["\u0275\u0275listener"]("click",(function(){return t.back()})),m["\u0275\u0275text"](46,"Back"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()),2&e&&(m["\u0275\u0275advance"](2),m["\u0275\u0275textInterpolate1"]("",t.mode," user"),m["\u0275\u0275advance"](2),m["\u0275\u0275property"]("formGroup",t.userForm),m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("status",null!=t.firstName&&t.firstName.hasError("minlength")||null!=t.firstName&&t.firstName.hasError("maxlength")?"danger":"primary"),m["\u0275\u0275advance"](1),m["\u0275\u0275property"]("showMinLength",null==t.firstName?null:t.firstName.hasError("minlength"))("showMaxLength",null==t.firstName?null:t.firstName.hasError("maxlength")),m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("status",null!=t.lastName&&t.lastName.hasError("minlength")||null!=t.lastName&&t.lastName.hasError("maxlength")?"danger":"primary"),m["\u0275\u0275advance"](1),m["\u0275\u0275property"]("showMinLength",null==t.lastName?null:t.lastName.hasError("minlength"))("showMaxLength",null==t.lastName?null:t.lastName.hasError("maxlength")),m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("status",(null!=t.login&&null!=t.login.errors&&t.login.errors.required||null!=t.login&&t.login.hasError("minlength")||null!=t.login&&t.login.hasError("maxlength"))&&t.login.touched?"danger":"primary"),m["\u0275\u0275advance"](1),m["\u0275\u0275property"]("showMinLength",null==t.login?null:t.login.hasError("minlength"))("showMaxLength",null==t.login?null:t.login.hasError("maxlength"))("showRequired",(null==t.login?null:null==t.login.errors?null:t.login.errors.required)&&t.login.touched),m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("status",(null!=t.age&&null!=t.age.errors&&t.age.errors.required||null!=t.age&&null!=t.age.errors&&t.age.errors.min||null!=t.age&&null!=t.age.errors&&t.age.errors.max||null!=t.age&&t.age.hasError("pattern"))&&t.age.touched?"danger":"primary"),m["\u0275\u0275advance"](1),m["\u0275\u0275property"]("showMin",(null==t.age?null:null==t.age.errors?null:t.age.errors.min)&&t.age.touched)("showMax",(null==t.age?null:null==t.age.errors?null:t.age.errors.max)&&t.age.touched)("showRequired",(null==t.age?null:null==t.age.errors?null:t.age.errors.required)&&t.age.touched)("showPattern",null==t.age?null:t.age.hasError("pattern")),m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("status",(null!=t.email&&null!=t.email.errors&&t.email.errors.required||null!=t.email&&t.email.hasError("pattern"))&&t.email.touched?"danger":"primary"),m["\u0275\u0275advance"](1),m["\u0275\u0275property"]("showPattern",(null==t.email?null:t.email.hasError("pattern"))&&t.email.touched)("showRequired",(null==t.email?null:null==t.email.errors?null:t.email.errors.required)&&t.email.touched),m["\u0275\u0275advance"](14),m["\u0275\u0275property"]("disabled",!t.userForm.valid))},directives:[v.B,v.D,v.A,s.q,s.h,v.cb,s.b,s.p,s.g,y.a,s.i,v.C,v.p],styles:["[_nghost-%COMP%]     cdk-global-scrollblock{position:null;width:null;overflow-y:null}[_nghost-%COMP%]     .cdk-global-scrollblock{position:static!important}.nb-theme-default   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-default   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-default   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-default   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-default   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}.nb-theme-dark   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-dark   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-dark   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-dark   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-dark   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}.nb-theme-cosmic   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-cosmic   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-cosmic   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-cosmic   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-cosmic   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}.nb-theme-corporate   [_nghost-%COMP%]   button[nbButton][_ngcontent-%COMP%]{margin:.25rem}.nb-theme-corporate   [_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;justify-content:space-around}.nb-theme-corporate   [_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:20rem}[dir=ltr]   .nb-theme-corporate   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 .75rem 0 0}[dir=rtl]   .nb-theme-corporate   [_nghost-%COMP%]   -shadowcsshost   button[_ngcontent-%COMP%]{margin:0 0 0 .75rem}"]}),o),E=n("pfsP"),x=[{path:"",component:c,children:[{path:"edit/:id",canActivate:[E.a],component:M},{path:"current",component:M},{path:"add",canActivate:[E.a],component:M}]}],_=((a=function e(){_classCallCheck(this,e)}).\u0275mod=m["\u0275\u0275defineNgModule"]({type:a}),a.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(e){return new(e||a)},imports:[[u.g.forChild(x)],u.g]}),a),N=n("gcnP"),P=n("h+2I");n.d(t,"UsersModule",(function(){return O}));var k,S=[v.m,v.q,v.E,v.db,v.Zb,v.uc,v.Ab,v.Ib,v.nb,v.ab,v.Qb,v.R,v.db],O=((k=function e(){_classCallCheck(this,e)}).\u0275mod=m["\u0275\u0275defineNgModule"]({type:k}),k.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(e){return new(e||k)},providers:[],imports:[[l.a,N.AuthModule,i.d,_,P.a,s.w].concat(S)]}),k)}}]);