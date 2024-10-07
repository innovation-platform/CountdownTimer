sap.ui.define(["sap/ui/core/mvc/Controller"],(Controller)=>{
    "use strict";
    return Controller.extend("countdowntimer.webapp.controller.Countdown",{
        onInit(){
            this._interval=null;
            this._paused=false;
            this._remainingTime=0;
        },
        onStartTimer(){
            var oInput=this.byId("inputSeconds");
            var iSeconds=parseInt(oInput.getValue(),10);
            
            if(iSeconds<=0 || isNaN(iSeconds)){
                sap.m.MessageToast.show("Please enter valid seconds.");
                return;
            }
            this._remainingTime=iSeconds;
            this.startCountdown(oInput);
        },
        startCountdown(oInput){
            var oTimerDisplay=this.byId("timerdisplay");
            this._interval=setInterval(()=>{
                if(!this._paused && this._remainingTime>0){
                    oTimerDisplay.setText("Time Left: "+this._remainingTime+" seconds");
                    this._remainingTime--;
                }else if(this._remainingTime==0){
                    oTimerDisplay.setText("Time's Up!");
                    oInput.setValue("");
                    oInput.setPlaceholder("Enter Input in Seconds...");
                    clearInterval(this._interval);
                    this._interval=null;
                }
            },1000);
        },
        onPauseResumeTimer(){
            if(!this._interval){
                return;
            }
            this._paused=!this._paused;
            var oPauseResumeButton=this.byId("pauseResumeButton");
            oPauseResumeButton.setText(this._paused?"Resume":"Pause");
        },
        onStopTimer(){
            this._remainingTime=0;
            this._paused=false;
            clearInterval(this._interval);
            this._interval=null;
            this.byId("timerdisplay").setText("Timer Stopped.");
            var oInput1=this.byId("inputSeconds");
            oInput1.setValue("");
            oInput1.setPlaceholder("Enter time in seconds...");
        },

    })
})