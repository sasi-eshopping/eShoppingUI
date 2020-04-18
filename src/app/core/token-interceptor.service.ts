import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { BehaviorSubject,throwError } from "rxjs";
//import {Observable} from "rxjs/index";
import { catchError,filter,switchMap,take, map,tap, retry } from 'rxjs/operators';
import {Router} from "@angular/router";
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    // Refresh Token Subject tracks the current token, or is null if no token is currently
    // available (e.g. refresh pending).
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );
    constructor(private auth: ApiService,private router: Router) {}

    intercept(request: HttpRequest<any>,next: HttpHandler ): Observable<HttpEvent<any>> {
        console.log('interceptor');
      
        return next.handle(request).pipe( /*switchMap ((rwq) :Observable<HttpEvent<any>>=>
        {
            if (!request.url.includes('/oauth/token') && !request.url.includes('?access_token')){
            let request2= this.addAuthenticationToken(request);
            console.log('toekn added'+request2.url);
            return next.handle(request2);
            }
            return next.handle(request);   
           
        }
      
        ),
        retry(1),*/
            catchError((err: any)=> {
                
                if (
                    request.url.includes("refreshtoken") ||
                    request.url.includes("login")
                ) {
                    // We do another check to see if refresh token failed
                    // In this case we want to logout user and to redirect it to login page
        
                    if (request.url.includes("refreshtoken")) {
                        this.auth.logout();
                          
                            
                        
                    }
        
                    return throwError(err) ;
                }

                if (err.status !== 401) {
                    return throwError(err) ;
                }
                if (this.refreshTokenInProgress) {
                    // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                    // – which means the new token is ready and we can retry the request again
                    return this.refreshTokenSubject.pipe(
                        filter(result => result !== null),
                        take(1),
                        switchMap( result => {
                           return next.handle(this.addAuthenticationToken(request))
                        })
                        );
                } 
                else {
                    this.refreshTokenInProgress = true;
    
                    // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                    this.refreshTokenSubject.next(null);
                    
                    // Call auth.refreshAccessToken(this is an Observable that will be returned)
                    return this.auth
                        .refreshAccessToken().pipe(
                        switchMap((token: any)=> {
                            //When the call to refreshToken completes we reset the refreshTokenInProgress to false
                            // for the next time the token needs to be refreshed
                            this.refreshTokenInProgress = false;
                            this.refreshTokenSubject.next(token);
                         
                                window.sessionStorage.setItem('token', JSON.stringify(token));
                                console.log('token refreshed......');
                                console.log('new access toekn'+window.sessionStorage.getItem('token'));
                               
                            //request1 : HttpRequest<any>;
                            let request1=request;
                            console.log('cloned request'+request1.url);
                            return next.handle(this.addAuthenticationToken(request1));
                        }),catchError((err: any) => {
                            this.refreshTokenInProgress = false;
    
                            this.auth.logout();
                            return throwError(err);
                        }));
                }
                //return throwError(err);
            })
);
    }
 

    addAuthenticationToken(request) {
        // Get access token from Local Storage
     
        const accessToken = JSON.parse(window.sessionStorage.getItem('token')).access_token;

        // If access token is null this means that user is not logged in
        // And we return the original request
        if (!accessToken) {
            return request;
        }
   

        return request.clone({
            setHeaders: {
                Authorization: 'Bearer'+accessToken
              }
        });

    }
   
}