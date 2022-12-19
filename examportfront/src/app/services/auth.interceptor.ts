import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private login:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

         //add the jwt token(local storage) request
         
        // const token = this.login.getToken();
        // if(token != null)
        // {
        //         req = req.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${token}`
        //             }
                
        //         });
        // }
        // return next.handle(req);

        


         //yaha se durgesh ka code h 


        let authReq = req;
        const token = this.login.getToken();
        // console.log("Inside interseptor");
        if(token != null)
        {
            authReq = authReq.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
        }
        return next.handle(authReq);


    // let authReq = req;
    //     const token = this.login.getToken();
    //     const authreq = req.clone({
    //         headers:new HttpHeaders({
    //             Authorization: `Bearer ${token}` ,
    //             "Content-Type":"application/json",
    //             "Access-Control-Allow_Origin":"*"
    //         })
    //     });
    //     console.log("authrequest header:" + authreq.headers)
    //     return next.handle(authreq);


    }

}


// export const AuthInterceptorProviders = [
//     {
//         provide: HTTP_INTERCEPTORS, 
//         useValue: LoginService,
//         userClass:AuthInterceptor,
//         multi:true,
//     },
// ];