

;(function () {
    "use strict";

    let Aupost=function (state,district,suburb,postInput,fullAddress) {
        if(!(this instanceof Aupost)) return new Aupost(state,district,suburb,postInput,fullAddress);

        let p=this;

        p.state=document.getElementById(state);
        p.district=document.getElementById(district);
        p.suburb=document.getElementById(suburb);
        p.postInput=document.getElementById(postInput);
        p.fullAddress=document.getElementById(fullAddress);

        p.init=function () {
            p.loadingState();  //initially loading states
            p.bindChangeEvent();
            p.district.innerHTML="";
            p.suburb.innerHTML="";
            p.postInput.value="";
            p.fullAddress.value="";
        };

        p.loadingState=function () {
            p.state.innerHTML="";
            p.optionsGenerator(p.data,p.state,"stateIndex");
        };

        p.loadingDistrict=function () {
            p.district.innerHTML="";
            let sid=p.state.options[p.state.selectedIndex].getAttribute("stateIndex");
            p.optionsGenerator(p.data[sid].district,p.district,"districtIndex");
        };
        p.loadingSuburb=function () {
            p.suburb.innerHTML="";
            let sid=p.state.options[p.state.selectedIndex].getAttribute("stateIndex");
            let did=p.district.options[p.district.selectedIndex].getAttribute("districtIndex");
            p.optionsGenerator(p.data[sid].district[did].suburb,p.suburb,"suburbIndex");
        };
        p.loadingPostCode=function () {//get postcode and append into postcode container
            let sid=p.state.options[p.state.selectedIndex].getAttribute("stateIndex");
            let did=p.district.options[p.district.selectedIndex].getAttribute("districtIndex");
            let pid=p.suburb.options[p.suburb.selectedIndex].getAttribute("suburbIndex");
            let postcode=p.data[sid].district[did].suburb[pid].Pcode;
            p.postInput.value=postcode;
        };
        p.loadingFullAddress=function () { //get all info and append into fullAddress container
            let state=p.state.options[p.state.selectedIndex].innerHTML;
            let district=p.district.options[p.district.selectedIndex].innerHTML;
            let suburb=p.suburb.options[p.suburb.selectedIndex].innerHTML;
            let postcode=p.postInput.value;
            let full=suburb+" "+district+" "+state+" "+postcode;
            postcode?p.fullAddress.value=full.toUpperCase():p.fullAddress.value="";
        };
        p.bindChangeEvent=function () {//for bind all change event
            p.state.onchange=function () {
                p.loadingDistrict();
                p.suburb.innerHTML="";
                p.postInput.value="";
                p.fullAddress.value="";
            };
            p.district.onchange=function () {
                p.loadingSuburb();
                p.postInput.value="";
                p.fullAddress.value="";
            };
            p.suburb.onchange=function () {
                p.loadingPostCode();
                p.loadingFullAddress();
            };
        };
        p.optionsGenerator=function (json_data,parent_obj,sel_index) {//generate options with Attr and append into SelectElement
            let option;
            for(let i=0,len=json_data.length;i<len;i++){
               option=document.createElement("option");
               if(sel_index){
                   option.setAttribute(sel_index,i);
               }
               option.innerHTML=json_data[i].name;
               parent_obj.appendChild(option);
            }
            option=null;
        };
        p.init();

        return{
            reset:p.init
        }
    };
    Aupost.prototype={
        data:[
            {"name":"--State--","district":[{"name":""}]},
            {"name":"VIC","district":[{"name":"--District--","suburb":[{"name":""}]},{"name":"Melbourne","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Kew","Pcode":"3101"},{"name":"Altona North","Pcode":"3025"},{"name":"Docklands","Pcode":"3008"},{"name":"Southbank","Pcode":"3006"},{"name":"East Melbourne","Pcode":"3002"},{"name":"Brunswick","Pcode":"3056"}]},{"name":"Geelong","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Anglesea","Pcode":"3230"},{"name":"Forrest","Pcode":"3236"},{"name":"Deans Marsh","Pcode":"3235"},{"name":"Birregurra","Pcode":"3242"}]},{"name":"Warnambool","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Purnim","Pcode":"3278"},{"name":"Wangoom","Pcode":"3279"},{"name":"Warrnambool","Pcode":"3280"},{"name":"Dennington","Pcode":"3280"}]},{"name":"Portland And Hamilton","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Merino","Pcode":"3310"},{"name":"Casterton","Pcode":"3311"},{"name":"Cavendish","Pcode":"3314"},{"name":"Harrow","Pcode":"3317"}]},{"name":"Horsham","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Goroke","Pcode":"3412"},{"name":"Natimuk","Pcode":"3409"}]}]},
            {"name":"NSW","district":[{"name":"--District--","suburb":[{"name":""}]},{"name":"Sydney","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Ultimo","Pcode":"2007"},{"name":"Chippendale","Pcode":"2008"},{"name":"Darlington","Pcode":"2008"},{"name":"Mascot","Pcode":"2020"}]},{"name":"Riverina","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Yenda","Pcode":"2681"},{"name":"Coolamon","Pcode":"2701"},{"name":"Ganmain","Pcode":"2702"},{"name":"Yanco","Pcode":"2703"}]},{"name":"Murray","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Euston","Pcode":"2737"},{"name":"Buronga","Pcode":"2739"},{"name":"Barham","Pcode":"2732"},{"name":"Kyalite","Pcode":"2734"}]},{"name":"North West","suburb":[{"name":"--Suburb--","Pcode":""},{"name":"Ballimore","Pcode":"2830"},{"name":"Brocklehurst","Pcode":"2830"},{"name":"Dubbo","Pcode":"2830"},{"name":"Mendooran","Pcode":"2842"}]}]}]

    };
    window.Aupost=Aupost;
}());


