const cheerio = require('cheerio');
const axios = require('axios');

export const handler = async (event) => {
  const link = event.queryStringParameters.link;
  const { data } = await axios.get(decodeURI(link));

  const $ = cheerio.load(data)

  // Load HTML we fetched in the previous line
  // const $ = cheerio.load(theHTML);

  const rows = $('table tbody').children('tr')

  const res = []

  let resultColumnIndex = 0
  const headers = $('table:eq(0) thead tr th')
  headers.each((i, el) => {
    const text = $(el).text()
    const textCleaned = text.trim().replaceAll('  ', ' ')

    console.log(textCleaned)
    if (textCleaned === 'ResultRes') {
      resultColumnIndex = i
    }
  })

  console.log(resultColumnIndex)


  rows.each((i, ele) => {
    const $nameEle = $(ele).find('td:nth-child(2) a')
    const nameText = $nameEle.contents().first().text()
    const nameTextCleaned = nameText.trim().replaceAll('  ', ' ')

    const $resultEle = $(ele).find(`td:nth-child(${resultColumnIndex + 1}) span.tipped`)
    const resultText = $resultEle.contents().first().text()
    const resultTextCleaned = resultText.trim().replaceAll('  ', ' ')

    res.push([
      nameTextCleaned,
      resultTextCleaned
    ])
  })

  console.table(res)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: res
    })
  }
}
//
//
// const theHTML = `
// <!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" lang="en"><head>
//                 <title>Atletiek.nu - BVV A.C. M+V Ere-afdeling - Live results!</title>
//                 <meta http-equiv="imagetoolbar" content="no">
//                 <meta http-equiv="content-type" content="text/html; charset=UTF-8">
//                 <meta name="content-language" content="en">
//                 <meta name="robots" content="index, follow">
//                 <meta name="robots" content="noarchive">
//                 <meta name="viewport" content="width=device-width" id="viewportsetting">
//                 <meta name="author" lang="en" content="Mark van Tubergen">
//                 <meta name="copyright" lang="en" content="Copyright 2011-2023, Mark van Tubergen">
//                 <meta name="description" lang="en" content="BVV A.C. M+V Ere-afdeling by AC Waasland TE Sint-Niklaas. View live results here!">
//                 <meta name="keywords" lang="en" content="Atletiek.nu,athletics,competition,BVV A.C. M+V Ere-afdeling,AC Waasland,Sint-Niklaas,live,results,results,score">
//                 <meta name="google" content="notranslate">
//                
//                 <base href="https://www.atletiek.nu/">
//                 <link rel="shortcut icon" href="https://www.atletiek.nu/favicon.ico">
//                 <link rel="apple-touch-icon" href="https://www.atletiek.nu/img/basicDesign/athletics.app logo_green.png">
//                 <link rel="apple-touch-icon-precomposed" href="https://www.atletiek.nu/img/basicDesign/athletics.app logo_green.png">
//
//                 <meta property="og:title" content="Atletiek.nu - BVV A.C. M+V Ere-afdeling - Live results!">
//                 <meta property="og:image" content="https://www.atletiek.nu/img/basicDesign/athletics.app logo_green_rounded.png">
//
//                                         <script async="" src="https://tags.refinery89.com/atletieknu.js" type="text/javascript"></script>
//                         <script type="text/javascript">var adsEnabled = true; var mayLoadAds = true;</script>
//                
//                
//                                         <link rel="stylesheet" type="text/css" href="https://www.atletiek.nu/css/full.min.css">
//                         <script src="https://www.atletiek.nu/js/full.min.js" type="text/javascript"></script>
//                        
//                 <script type="text/javascript">
//                                                         function AWAObject() {}
//
//                                 var AWA = new AWAObject();
//
//                                 AWA.ajaxSep                     = "<awa;Sep>";
//                                 AWA.page                        = "wedstrijd";
//                                 AWA.do                          = "uitslagenonderdeel";
//                                 AWA.do2                         = "main";
//
//                                 AWA.baan_id             = 0;
//                                 AWA.event_id            = 39076;
//                                 AWA.categorie_id        = 0;
//                                 AWA.vereniging_id       = 0;
//                                 AWA.onderdeel_id        = 0;
//                                 AWA.startlijst_id       = 0;
//                                 AWA.deelnemer_id        = 0;
//                                 AWA.team_id     = 0;
//                                 AWA.prev = new AWAObject();
//
//                                 AWA.myswitch = function( kind, newvalue )
//                                 {
//                                         switch ( kind )
//                                         {
//                                                 case "onderdeel_id":
//                                                         AWA.prev.onderdeel_id = AWA.onderdeel_id;
//                                                         AWA.onderdeel_id = newvalue;
//                                                         break;
//                                         }
//                                 }
//
//                                 AWA.restore = function( kind )
//                                 {
//                                         switch ( kind )
//                                         {
//                                                 case "onderdeel_id":
//                                                         AWA.onderdeel_id = AWA.prev.onderdeel_id;
//                                                         break;
//                                                 case "all":
//                                                         AWA.onderdeel_id = AWA.prev.onderdeel_id;
//                                                         break;
//                                         }
//                                 }
//                        
//                         jQuery(function() {
//                                 standaardMain();
//                                 if ( typeof(wedstrijdMain) == 'function' )
//                                         wedstrijdMain();if ( typeof(wedstrijdUitslagenonderdeel) == 'function' )
//                                                 wedstrijdUitslagenonderdeel();                  });
//                 </script>
//         </head>
//         <body class="">
//         <div style="display: none;" class="feedback-btn-enabled"></div>
//         <div id="msgcenter" style="margin: 0 12px 5px; display: none;" class="alert"></div>
//
//        
//
// <div id="outer" class="maximizeScreen">
//         <div id="header" class="">
//                 <a id="headercontent" href="https://www.atletiek.nu/" class="no-ajaxy">
//                         <img src="https://www.atletiek.nu/img/basicDesign/athletics.app logo_white.png">
//                                         </a>
//         </div>
//                 <div id="headerpic" class="">
//                                                         <div class="pageTitleGradient"></div>
//                                 <div class="pageTitle pageTitleBig" onclick="window.location='https://www.atletiek.nu/wedstrijd/main/39076/';" style="cursor: pointer;">
//                                         BVV A.C. M+V Ere-afdeling<br>
//                                         <span class="smalldetail">
//                                                                                                         <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                         Sint-Niklaas, Sunday  7 May 2023                       </span>
//                                 </div>
//                                                         <div class="toptopnav">
//                                 <ul>
//                                        
//                                         <li><a href="https://www.atletiek.nu/login/" class="no-ajaxy right "><i class="fa fa-sign-in"></i> <span>Log in</span></a></li>                                 <li class="countryspecific country_NL country_CW"><a href="https://www.atletiek.nu/ranglijsten/" class="no-ajaxy left"><i class="fa fa-list-ol"></i> <span>Top lists</span></a></li>
//                                         <li><a href="https://www.atletiek.nu/atleten/" class="no-ajaxy left"><i class="fa fa-users"></i> <span>Athletes</span></a></li>
//                                         <li><a href="https://www.atletiek.nu/wedstrijden/" class="no-ajaxy right"><i class="fa fa-calendar"></i> <span>Competitions</span></a></li>
//                                         <li class="countryspecific country_NL"><a href="https://www.atletiek.nu/competitie/" class="no-ajaxy right"><i class="fa fa-bar-chart"></i> <span>League</span></a></li>
//                                                                         </ul>
//                         </div>
//                 </div>
//
//
//                         <div id="menu">
//                         <ul id="topmenuHolder" class="">
//                                         <li class=""><a href="https://www.atletiek.nu/wedstrijd/main/39076/"><i class="fa fa-home"></i> Overview</a></li>
//                 <li><a href="https://www.atletiek.nu/wedstrijd/atleten/39076/"><i class="fa fa-users"></i> Competitors</a></li>
//                         <li><a href="https://www.atletiek.nu/wedstrijd/chronoloog/39076/"><i class="fa fa-clock-o"></i> Timetable</a></li>
//                 <li><a href="https://www.atletiek.nu/wedstrijd/uitslagen/39076/"><i class="fa fa-trophy"></i> Results</a></li>
//         <li><a href="https://www.atletiek.nu/wedstrijd/statistieken/39076/"><i class="fa fa-bar-chart-o"></i> Statistics</a></li>
//                         <li><a href="https://www.atletiek.nu/wedstrijd/teams/39076/"><i class="fa fa-sitemap"></i> Teams</a></li>
//                                 <li><a href="https://www.atletiek.nu/wedstrijd/estafetteteams/39076/"><i class="fa fa-random"></i> Relay race</a></li>
//                 <li id="global_searchHolder" style="float: right; margin: -5px 0px 0px 0px;">
//                 <div style="float: left;"><input id="global_search" style="" type="text" class="input-large" placeholder="Search in competition" value=""></div><button style="float: left;" class="btn btn-warning" onclick="doSearch( 'global_search' );" type="button"><i class="fa fa-search"></i></button>
//         </li>
//                                 </ul>
//                 </div>
//                 <div id="mobileMenuHolder">
//                        
// <div class="navigation navigation-7">
//         <a href="https://www.atletiek.nu/wedstrijd/main/39076/" id="menu-1" class="nav-icon"><i class="fa fa-home"></i>Overview</a>
//                 <a href="https://www.atletiek.nu/wedstrijd/atleten/39076/" id="menu-6" class="nav-icon"><i class="fa fa-users"></i>Competitors</a>
//                         <a href="https://www.atletiek.nu/wedstrijd/chronoloog/39076/" id="menu-4" class="nav-icon"><i class="fa fa-clock-o"></i>Timetable</a>
//                 <a href="https://www.atletiek.nu/wedstrijd/uitslagen/39076/" id="menu-5" class="nav-icon"><i class="fa fa-trophy"></i>Results</a>
//
//                         <a href="https://www.atletiek.nu/wedstrijd/teams/39076/" id="menu-7" class="nav-icon"><i class="fa fa-sitemap"></i>Teams</a>
//                                 <a href="https://www.atletiek.nu/wedstrijd/estafetteteams/39076/" id="menu-8" class="nav-icon"><i class="fa fa-random"></i>Relay race</a>
//                                 <a href="https://www.atletiek.nu/wedstrijd/statistieken/39076/" id="menu-6" class="nav-icon"><i class="fa fa-bar-chart-o"></i>Statistics</a>
//                         <div class="clear"></div>
// </div>          </div>
//                         <div id="full_content" class="desktopFlex">
//                
//                                                 <div id="menuHolder" class="aNormalSubMenuHolder">
//                                 <div class="menubottomExtended"></div>
//                                 <div id="left_side">
//                                         <ul class="normalleftmenu minimenuholder nav nav-list">
//
//                                         </ul>
//                                                                         </div>
//                                 <div class="leftmenuimage ">
//                                         <img src="https://www.atletiek.nu/img/federation-flags/22WA_Rankings_Competition_Logo_RGB.png" style="margin: 0 20px 20px; width: 80%;" class="tipped" title="This competition has been recognized by World Athletics. This means that achievements set up on this competition are valid for admission requirements/limits for international tournaments such as a European Championship and World Championship and counts for your World Ranking."><a href="https://www.atletiek.be/" target="_blank" style="cursor: pointer;" class="no-ajaxy"><img src="https://www.atletiek.nu/img/basicDesign/BE_VAL_logo_400x400.jpg" class="tipped" title="Made possible by the Flemish Athletics League"></a>                           </div>
//                         </div>
//                                 <div id="container" style="width: 100%;">
//                                                         <div id="menubottom">
//                                         <a class="no-ajaxy visuallyhidden" href="https://www.atletiek.nu/">Home</a> <i class="fa fa-chevron-right  visuallyhidden" style="font-size: 10px; color: lightgray;"></i> <a href="https://www.atletiek.nu/wedstrijden/" class="visuallyhidden">Competitions</a> <i class="fa fa-chevron-right  visuallyhidden" style="font-size: 10px; color: lightgray;"></i> <a href="https://www.atletiek.nu/wedstrijd/main/39076/" class="hidden-xs">BVV A.C. M+V Ere-afdeling</a> <i class="fa fa-chevron-right  hidden-xs" style="font-size: 10px; color: lightgray;"></i> <a href="https://www.atletiek.nu/wedstrijd/uitslagen/39076/">Results</a> <i class="fa fa-chevron-right " style="font-size: 10px; color: lightgray;"></i> <a href="https://www.atletiek.nu/wedstrijd/uitslagenonderdeel/39076/400mH/">400mH</a><script type="application/ld+json">
//         {
//                 "@context": "https://schema.org",
//                 "@type": "BreadcrumbList",
//                 "itemListElement":
//                 [
//                                                         {
//                                         "@type": "ListItem",
//                                         "position": 1,
//                                         "item":
//                                         {
//                                                 "@id": "https://www.atletiek.nu/",
//                                                 "name": "Home"
//                                         }
//                                 }
//                                 ,                               {
//                                         "@type": "ListItem",
//                                         "position": 2,
//                                         "item":
//                                         {
//                                                 "@id": "https://www.atletiek.nu/wedstrijden/",
//                                                 "name": "Competitions"
//                                         }
//                                 }
//                                 ,                               {
//                                         "@type": "ListItem",
//                                         "position": 3,
//                                         "item":
//                                         {
//                                                 "@id": "https://www.atletiek.nu/wedstrijd/main/39076/",
//                                                 "name": "BVV A.C. M+V Ere-afdeling"
//                                         }
//                                 }
//                                 ,                               {
//                                         "@type": "ListItem",
//                                         "position": 4,
//                                         "item":
//                                         {
//                                                 "@id": "https://www.atletiek.nu/wedstrijd/uitslagen/39076/",
//                                                 "name": "Results"
//                                         }
//                                 }
//                                 ,                               {
//                                         "@type": "ListItem",
//                                         "position": 5,
//                                         "item":
//                                         {
//                                                 "@id": "https://www.atletiek.nu/wedstrijd/uitslagenonderdeel/39076/400mH/",
//                                                 "name": "400mH"
//                                         }
//                                 }
//                                                 ]
//         }
// </script>
//                                 </div>
//                                                         <div id="content" class="">
//                                 <div id="primarycontainer">
//         <div id="primarycontent">
//                                         <div class="atltab-content">
//                                 <div class="atletiek_ros_alpha_leaderboard-billboard-container hidden-xs" style=""><div id="atletiek_ros_alpha_leaderboard-billboard"><div class="supporterInfo" style="display: none;"></div></div></div><div class="atletiek_ros_alpha_mobile-container hidden-sm hidden-md hidden-lg hidden-xlg" style=""><div id="atletiek_ros_alpha_mobile"><div class="supporterInfo" style="display: none;"></div></div></div><br>      <div id="328876_76" class="tab-pane">
//                                                                                                                <h2>AC vrouwen 400 meters hurdles</h2>           <div class="searchbar">
//                         <span class="input-append">
//                                 <input type="text" class="input-normal" placeholder="Search for an athlete in this list" id="deelnemers_1_search" value="">
//                                 <button class="btn btn-success" type="button"><i class="fa fa-search"></i></button>
//                         </span>
//                 </div>
//                 <script language="javascript">
//                         registerSearch( "table#deelnemers_1", "deelnemers_1_search"  );
//                 </script>
//                
//         <div id="deelnemers_response_1" class="tooltipLater"></div>
//         <table id="deelnemers_1" class="deelnemerstabel ">
//                 <thead>
//                         <tr>
//                                 <th class="tipped header" title="Position" style="width: 20px">#</th>
//                                                                                                           <th class="header">Name</th>
//                                 <th class="tipped header hidden-xs" title="Club" style="width: 80px">Club</th>
//                                 <th class="tipped hidden-xs header" title="Team" style="width: 50px">Team</th>
//                                 <th class="tipped hidden-xs header" title="Category" style="width: 80px">Category</th>
//                                 <th class="tipped hidden-xs header" title="Hurdles height" style="width: 80px">Hurdles height</th>
//                                 <th class="tipped sortInitialOrder-asc" title="400 meters hurdles" style="text-align: right; width: 50px"><span class="hidden-xs">Result</span><span class="visible-xs">Res</span></th><th class="tipped sortInitialOrder-asc header" style="text-align: right;" title="Claimed best performance">CBP</th><th style="width: 90px; text-align: right;" class="tipped sortInitialOrder-desc" title="Points total">Points total</th><th style="width: 90px; text-align: right;" class="tipped sortInitialOrder-desc header" title="Team points total">Team points</th>                     </tr>
//                 </thead>
//                 <tbody>
//                                                         <tr id="deelnemer_id=1635806" data-deelnemer_id="1635806" class="" style="">
//                                                                                         <td id="deelnemer_id=1635806">
//                                                         <b>
//                                                                 1                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1635806/">
//                                                                                                                Loike  Vierendeels                                                                                              <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-W - <span class="visible-xs-inline">AC-V - LEBB</span><span class="hidden-xs">AC-V - LEBB</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27908/">Lebbeekse AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81566/"><span class="visible-xs-inline">AC-V - LEBB</span><span class="hidden-xs">AC-V - LEBB</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/26/">Senior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="62.780"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />13 points  ">1:02,78</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                          </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="62.860"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 01-05-2023, Lede (BEL)<br><i>Claimed best performance</i> ">1:02,86</span></span><span class="visible-xs smalldetail"></span></td>                   <td style="text-align: right;">13</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 13                                             </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1637623" data-deelnemer_id="1637623" class="" style="">
//                                                                                         <td id="deelnemer_id=1637623">
//                                                         <b>
//                                                                 2                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1637623/">
//                                                                                                                Nenah  De Coninck                                                                                               <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-W - <span class="visible-xs-inline">AC-V - ACME</span><span class="hidden-xs">AC-V - ACME</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27860/">AC Meetjesland</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81674/"><span class="visible-xs-inline">AC-V - ACME</span><span class="hidden-xs">AC-V - ACME</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/26/">Senior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="63.430"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />11 points  ">1:03,43</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                          </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">11</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 11                                             </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1633929" data-deelnemer_id="1633929" class="" style="">
//                                                                                         <td id="deelnemer_id=1633929">
//                                                         <b>
//                                                                 3                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1633929/">
//                                                                                                                Jana  Horemans                                                                                                  <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-W - <span class="visible-xs-inline">AC-V - AVT</span><span class="hidden-xs">AC-V - AVT</span> - 76.2cm                                                    </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27875/">AV Toekomst</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81536/"><span class="visible-xs-inline">AC-V - AVT</span><span class="hidden-xs">AC-V - AVT</span></a>                      </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/26/">Senior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="65.080"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />10 points  ">1:05,08</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                          </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="67.210"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 17-07-2022, Hasselt (BEL)<br><i>Claimed best performance</i> ">1:07,21</span></span><span class="visible-xs smalldetail"></span></td>                <td style="text-align: right;">10</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 10                                             </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1632033" data-deelnemer_id="1632033" class="" style="">
//                                                                                         <td id="deelnemer_id=1632033">
//                                                         <b>
//                                                                 4                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1632033/">
//                                                                                                                Anke  Sirjacobs                                                                                                 <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SCH-W - <span class="visible-xs-inline">AC-V - VS</span><span class="hidden-xs">AC-V - VS</span> - 76.2cm                                                      </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27938/">Vlierzele Sportief</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81509/"><span class="visible-xs-inline">AC-V - VS</span><span class="hidden-xs">AC-V - VS</span></a>                        </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="16v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/338/">Scholier Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="67.660"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />9 points  ">1:07,66</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="67.290"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 23-04-2022, Beveren (BEL)<br><i>Claimed best performance</i> ">1:07,29</span></span><span class="visible-xs smalldetail"></span></td>                <td style="text-align: right;">9</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 9                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1636936" data-deelnemer_id="1636936" class="" style="">
//                                                                                         <td id="deelnemer_id=1636936">
//                                                         <b>
//                                                                 5                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1636936/">
//                                                                                                                Hannelore  Heymans                                                                                              <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 JUN-W - <span class="visible-xs-inline">AC-V - EA</span><span class="hidden-xs">AC-V - EA</span> - 76.2cm                                                      </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27890/">AC Eendracht Aalst</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81504/"><span class="visible-xs-inline">AC-V - EA</span><span class="hidden-xs">AC-V - EA</span></a>                        </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="18v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/344/">Junior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="68.140"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />8 points  ">1:08,14</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="66.950"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 15-08-2021, Deinze (BEL)<br><i>Claimed best performance</i> ">1:06,95</span></span><span class="visible-xs smalldetail"></span></td>                 <td style="text-align: right;">8</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 8                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1630472" data-deelnemer_id="1630472" class="" style="">
//                                                                                         <td id="deelnemer_id=1630472">
//                                                         <b>
//                                                                 6                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1630472/">
//                                                                                                                Lara  Arefi                                                                                                     <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 JUN-W - <span class="visible-xs-inline">AC-V - STAX</span><span class="hidden-xs">AC-V - STAX</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27931/">STAX</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81458/"><span class="visible-xs-inline">AC-V - STAX</span><span class="hidden-xs">AC-V - STAX</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="18v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/344/">Junior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="68.810"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />7 points  ">1:08,81</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="69.190"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 14-05-2022, Merksem (Antwerpen) (BEL)<br><i>Claimed best performance</i> ">1:09,19</span></span><span class="visible-xs smalldetail"></span></td>    <td style="text-align: right;">7</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 7                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1638106" data-deelnemer_id="1638106" class="" style="">
//                                                                                         <td id="deelnemer_id=1638106">
//                                                         <b>
//                                                                 7                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1638106/">
//                                                                                                                Sien  Vanspeybrouck                                                                                             <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SCH-W - <span class="visible-xs-inline">AC-V - HAC</span><span class="hidden-xs">AC-V - HAC</span> - 76.2cm                                                    </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27896/">Houtland AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81568/"><span class="visible-xs-inline">AC-V - HAC</span><span class="hidden-xs">AC-V - HAC</span></a>                      </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="16v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/338/">Scholier Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="71.830"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />6 points  ">1:11,83</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="71.780"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 23-04-2023, Tielt (BEL)<br><i>Claimed best performance</i> ">1:11,78</span></span><span class="visible-xs smalldetail"></span></td>                  <td style="text-align: right;">6</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 6                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1631166" data-deelnemer_id="1631166" class="" style="">
//                                                                                         <td id="deelnemer_id=1631166">
//                                                         <b>
//                                                                 8                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1631166/">
//                                                                                                                <span class="visible-xs-inline">C.  Bula Bula</span>
//                                                                 <span class="hidden-xs">Chadrak Belinda  Bula Bula</span>
//                                                                                                                <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 JUN-W - <span class="visible-xs-inline">AC-V - VMOL</span><span class="hidden-xs">AC-V - VMOL</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27936/">VABCO MOL</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81497/"><span class="visible-xs-inline">AC-V - VMOL</span><span class="hidden-xs">AC-V - VMOL</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="18v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/344/">Junior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="72.830"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />5 points  ">1:12,83</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="69.260"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 15-08-2022, Sint-Niklaas (BEL)<br><i>Claimed best performance</i> ">1:09,26</span></span><span class="visible-xs smalldetail"></span></td>           <td style="text-align: right;">5</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 5                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1636095" data-deelnemer_id="1636095" class="" style="">
//                                                                                         <td id="deelnemer_id=1636095">
//                                                         <b>
//                                                                 9                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1636095/">
//                                                                                                                Siege  Van Gelder                                                                                               <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-W - <span class="visible-xs-inline">AC-V - OLSE</span><span class="hidden-xs">AC-V - OLSE</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27918/">OLSE AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81573/"><span class="visible-xs-inline">AC-V - OLSE</span><span class="hidden-xs">AC-V - OLSE</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/26/">Senior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="73.190"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />4 points  ">1:13,19</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">4</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 4                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1637256" data-deelnemer_id="1637256" class="" style="">
//                                                                                         <td id="deelnemer_id=1637256">
//                                                         <b>
//                                                                 10                                             </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1637256/">
//                                                                                                                Sarah  Bruwiere                                                                                                 <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-W - <span class="visible-xs-inline">AC-V - AVKA</span><span class="hidden-xs">AC-V - AVKA</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27871/">AV Kontich Aartselaar</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81646/"><span class="visible-xs-inline">AC-V - AVKA</span><span class="hidden-xs">AC-V - AVKA</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/26/">Senior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="79.870"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />3 points  ">1:19,87</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">3</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 3                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1637571" data-deelnemer_id="1637571" class="" style="">
//                                                                                         <td id="deelnemer_id=1637571">
//                                                         <b>
//                                                                 11                                             </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1637571/">
//                                                                                                                Margaux  Tremerie                                                                                               <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 JUN-W - <span class="visible-xs-inline">AC-V - FLAC</span><span class="hidden-xs">AC-V - FLAC</span> - 76.2cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27892/">Flanders AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81653/"><span class="visible-xs-inline">AC-V - FLAC</span><span class="hidden-xs">AC-V - FLAC</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="18v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/344/">Junior Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="82.070"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />2 points  ">1:22,07</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">2</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 2                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1634495" data-deelnemer_id="1634495" class="" style="">
//                                                                                         <td id="deelnemer_id=1634495">
//                                                         <b>
//                                                                                                                </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1634495/">
//                                                                                                                Martha  Geerardyn                                                                                               <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SCH-W - <span class="visible-xs-inline">AC-V - ACW</span><span class="hidden-xs">AC-V - ACW</span> - 76.2cm                                                    </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27862/">AC Waasland</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81544/"><span class="visible-xs-inline">AC-V - ACW</span><span class="hidden-xs">AC-V - ACW</span></a>                      </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="16v"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/338/">Scholier Women</a></td>
//                                                                                         <td class="hidden-xs">76.2cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="9999996"></span><span class="tipped" title="400 meters hurdles<br>Disqualified  ">DQ</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                                               </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">0</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 0                                              </td>
//                                                                                         </tr>
//                                                 </tbody>
//         </table>
//
//                                                                 </div>
//                                                                                                                <div id="343335_76" class="tab-pane">
//                                                                                                                <h2>AC mannen 400 meters hurdles</h2>            <div class="searchbar">
//                         <span class="input-append">
//                                 <input type="text" class="input-normal" placeholder="Search for an athlete in this list" id="deelnemers_2_search" value="">
//                                 <button class="btn btn-success" type="button"><i class="fa fa-search"></i></button>
//                         </span>
//                 </div>
//                 <script language="javascript">
//                         registerSearch( "table#deelnemers_2", "deelnemers_2_search"  );
//                 </script>
//                
//         <div id="deelnemers_response_2" class="tooltipLater"></div>
//         <table id="deelnemers_2" class="deelnemerstabel ">
//                 <thead>
//                         <tr>
//                                 <th class="tipped header" title="Position" style="width: 20px">#</th>
//                                                                                                           <th class="header">Name</th>
//                                 <th class="tipped header hidden-xs" title="Club" style="width: 80px">Club</th>
//                                 <th class="tipped hidden-xs header" title="Team" style="width: 50px">Team</th>
//                                 <th class="tipped hidden-xs header" title="Category" style="width: 80px">Category</th>
//                                 <th class="tipped hidden-xs header" title="Hurdles height" style="width: 80px">Hurdles height</th>
//                                 <th class="tipped sortInitialOrder-asc" title="400 meters hurdles" style="text-align: right; width: 50px"><span class="hidden-xs">Result</span><span class="visible-xs">Res</span></th><th class="tipped sortInitialOrder-asc header" style="text-align: right;" title="Claimed best performance">CBP</th><th style="width: 90px; text-align: right;" class="tipped sortInitialOrder-desc" title="Points total">Points total</th><th style="width: 90px; text-align: right;" class="tipped sortInitialOrder-desc header" title="Team points total">Team points</th>                     </tr>
//                 </thead>
//                 <tbody>
//                                                         <tr id="deelnemer_id=1636935" data-deelnemer_id="1636935" class="" style="">
//                                                                                         <td id="deelnemer_id=1636935">
//                                                         <b>
//                                                                 1                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1636935/">
//                                                                                                                <span class="visible-xs-inline">D.  Van Nieuwenhove</span>
//                                                                 <span class="hidden-xs">Dries  Van Nieuwenhove</span>
//                                                                                                                <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - EA</span><span class="hidden-xs">AC-M - EA</span> - 91.4cm                                                      </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27890/">AC Eendracht Aalst</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81503/"><span class="visible-xs-inline">AC-M - EA</span><span class="hidden-xs">AC-M - EA</span></a>                        </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="52.460"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />13 points  ">52,46</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                            </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="49.560"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 26-06-2022, Gentbrugge (BEL)<br><i>Claimed best performance</i> ">49,56</span></span><span class="visible-xs smalldetail"></span></td>               <td style="text-align: right;">13</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 13                                             </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1638115" data-deelnemer_id="1638115" class="" style="">
//                                                                                         <td id="deelnemer_id=1638115">
//                                                         <b>
//                                                                 2                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1638115/">
//                                                                                                                Timon  Inghelbrecht                                                                                             <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - HAC</span><span class="hidden-xs">AC-M - HAC</span> - 91.4cm                                                    </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27896/">Houtland AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81686/"><span class="visible-xs-inline">AC-M - HAC</span><span class="hidden-xs">AC-M - HAC</span></a>                      </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="54.800"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />11 points  ">54,80</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                            </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="55.500"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 24-05-2021, Tilburg (NLD)<br><i>Claimed best performance</i> ">55,50</span></span><span class="visible-xs smalldetail"></span></td>                  <td style="text-align: right;">11</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 11                                             </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1632031" data-deelnemer_id="1632031" class="" style="">
//                                                                                         <td id="deelnemer_id=1632031">
//                                                         <b>
//                                                                 3                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1632031/">
//                                                                                                                Wout  Van Hoof                                                                                                  <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 JUN-M - <span class="visible-xs-inline">AC-M - VS</span><span class="hidden-xs">AC-M - VS</span> - 91.4cm                                                      </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27938/">Vlierzele Sportief</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81508/"><span class="visible-xs-inline">AC-M - VS</span><span class="hidden-xs">AC-M - VS</span></a>                        </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="18m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/341/">Junior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="54.840"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />10 points  ">54,84</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                            </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="55.450"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 24-06-2022, Gentbrugge (BEL)<br><i>Claimed best performance</i> ">55,45</span></span><span class="visible-xs smalldetail"></span></td>               <td style="text-align: right;">10</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 10                                             </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1635768" data-deelnemer_id="1635768" class="" style="">
//                                                                                         <td id="deelnemer_id=1635768">
//                                                         <b>
//                                                                 4                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1635768/">
//                                                                                                                Quinten  Lockefeer                                                                                              <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - LEBB</span><span class="hidden-xs">AC-M - LEBB</span> - 91.4cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27908/">Lebbeekse AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81567/"><span class="visible-xs-inline">AC-M - LEBB</span><span class="hidden-xs">AC-M - LEBB</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="57.180"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />9 points  ">57,18</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                             </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="59.270"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 19-06-2022, Sint-Niklaas (BEL)<br><i>Claimed best performance</i> ">59,27</span></span><span class="visible-xs smalldetail"></span></td>             <td style="text-align: right;">9</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 9                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1630457" data-deelnemer_id="1630457" class="" style="">
//                                                                                         <td id="deelnemer_id=1630457">
//                                                         <b>
//                                                                 5                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/nl.png" class="flagicon tipped" title="Netherlands<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1630457/">
//                                                                                                                Pelle  Gelderblom                                                                                               <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - STAX</span><span class="hidden-xs">AC-M - STAX</span> - 91.4cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27931/">STAX</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81459/"><span class="visible-xs-inline">AC-M - STAX</span><span class="hidden-xs">AC-M - STAX</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="57.380"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />8 points  ">57,38</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                             </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="57.230"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 22-04-2023, Ninove (BEL)<br><i>Claimed best performance</i> ">57,23</span></span><span class="visible-xs smalldetail"></span></td>                   <td style="text-align: right;">8</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 8                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1633924" data-deelnemer_id="1633924" class="" style="">
//                                                                                         <td id="deelnemer_id=1633924">
//                                                         <b>
//                                                                 6                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1633924/">
//                                                                                                                Jan  Dullers                                                                                                    <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - AVT</span><span class="hidden-xs">AC-M - AVT</span> - 91.4cm                                                    </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27875/">AV Toekomst</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81537/"><span class="visible-xs-inline">AC-M - AVT</span><span class="hidden-xs">AC-M - AVT</span></a>                      </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="57.920"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />7 points  ">57,92</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                             </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="58.490"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 02-10-2021, Lanaken (BEL)<br><i>Claimed best performance</i> ">58,49</span></span><span class="visible-xs smalldetail"></span></td>                  <td style="text-align: right;">7</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 7                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1634535" data-deelnemer_id="1634535" class="" style="">
//                                                                                         <td id="deelnemer_id=1634535">
//                                                         <b>
//                                                                 7                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1634535/">
//                                                                                                                <span class="visible-xs-inline">G.  Van De Voorde</span>
//                                                                 <span class="hidden-xs">Gerben  Van De Voorde</span>
//                                                                                                                <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - ACW</span><span class="hidden-xs">AC-M - ACW</span> - 91.4cm                                                    </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27862/">AC Waasland</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81545/"><span class="visible-xs-inline">AC-M - ACW</span><span class="hidden-xs">AC-M - ACW</span></a>                      </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="58.960"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />6 points  ">58,96</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                             </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">6</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 6                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1637570" data-deelnemer_id="1637570" class="" style="">
//                                                                                         <td id="deelnemer_id=1637570">
//                                                         <b>
//                                                                 8                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1637570/">
//                                                                                                                Lars  Oosterlinck                                                                                               <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 SEN-M - <span class="visible-xs-inline">AC-M - FLAC</span><span class="hidden-xs">AC-M - FLAC</span> - 91.4cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27892/">Flanders AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81652/"><span class="visible-xs-inline">AC-M - FLAC</span><span class="hidden-xs">AC-M - FLAC</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="20m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/19/">Senior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="61.350"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />5 points  ">1:01,35</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="62.070"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 22-04-2023, Tielt (BEL)<br><i>Claimed best performance</i> ">1:02,07</span></span><span class="visible-xs smalldetail"></span></td>                  <td style="text-align: right;">5</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 5                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1637244" data-deelnemer_id="1637244" class="" style="">
//                                                                                         <td id="deelnemer_id=1637244">
//                                                         <b>
//                                                                 9                                              </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1637244/">
//                                                                                                                Johan  Melotte                                                                                                  <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 MAS-M - <span class="visible-xs-inline">AC-M - AVKA</span><span class="hidden-xs">AC-M - AVKA</span> - 91.4cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27871/">AV Kontich Aartselaar</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81645/"><span class="visible-xs-inline">AC-M - AVKA</span><span class="hidden-xs">AC-M - AVKA</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="34m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/20/">Masters Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="62.670"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />4 points  ">1:02,67</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">4</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 4                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1636090" data-deelnemer_id="1636090" class="" style="">
//                                                                                         <td id="deelnemer_id=1636090">
//                                                         <b>
//                                                                 10                                             </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1636090/">
//                                                                                                                Daan  Geleyn                                                                                                    <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 JUN-M - <span class="visible-xs-inline">AC-M - OLSE</span><span class="hidden-xs">AC-M - OLSE</span> - 91.4cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27918/">OLSE AC</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81574/"><span class="visible-xs-inline">AC-M - OLSE</span><span class="hidden-xs">AC-M - OLSE</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="18m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/341/">Junior Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="64.260"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />3 points  ">1:04,26</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="9999999"></span><span class="tipped" title="400 meters hurdles ">---</span></span><span class="visible-xs smalldetail"></span></td>                                                 <td style="text-align: right;">3</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 3                                              </td>
//                                                                                         </tr>
//                                                                 <tr id="deelnemer_id=1631137" data-deelnemer_id="1631137" class="" style="">
//                                                                                         <td id="deelnemer_id=1631137">
//                                                         <b>
//                                                                 11                                             </b>
//                                                 </td>
//                                         <td>                                                    <img src="https://www.atletiek.nu/img/country-flags/png100px/be.png" class="flagicon tipped" title="Belgium<br><span class='subtext'>Europe</span>">
//                                                                                                         <a class="no-ajaxy" href="https://www.atletiek.nu/atleet/main/1631137/">
//                                                                                                                Maurice  Vanuytven                                                                                              <span class="smalldetail deelnemer-smalldetail visible-xs">
//                                                                 MAS-M - <span class="visible-xs-inline">AC-M - VMOL</span><span class="hidden-xs">AC-M - VMOL</span> - 91.4cm                                                  </span>
//                                                                                                         </a>
//                                                                                         </td>
//                                        
//                                                                                         <td class="smalldetail hidden-xs"><a href="https://www.atletiek.nu/wedstrijd/vereniging/39076/27936/">VABCO MOL</a></td>
//                                                                                         <td class="smalldetail hidden-xs">
//                                                         <a href="https://www.atletiek.nu/team/main/81496/"><span class="visible-xs-inline">AC-M - VMOL</span><span class="hidden-xs">AC-M - VMOL</span></a>                    </td>
//                                                                                         <td class="hidden-xs"><span class="sortData" data="34m"></span><a href="https://www.atletiek.nu/wedstrijd/categorie/39076/20/">Masters Men</a></td>
//                                                                                         <td class="hidden-xs">91.4cm</td>
//                                                                                                 <td style="text-align: right;">
//                                                                 <b><span class="sortData" data="75.340"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br />2 points  ">1:15,34</span><span style="text-align: right;" class="visible-xs"><span class="tipped " title=""></span></span></b>                           </td>
//                                                         <td style="text-align: right;"><span class="" style="color: #979595; font-weight: normal; font-style: italic; font-size: 90%;"><span class="sortData" data="74.780"></span><span class="tipped" title="400 meters hurdles<br />(in seconds)<br /> 09-10-2021, Lier (BEL)<br><i>Claimed best performance</i> ">1:14,78</span></span><span class="visible-xs smalldetail"></span></td>                   <td style="text-align: right;">2</td>
//                                                                                                                <td style="text-align: right;">
//                                                                 2                                              </td>
//                                                                                         </tr>
//                                                 </tbody>
//         </table>
//
//                                                                 </div>
//                                                         <br>                    </div>
//                         <div class="minimenu">
//                                 <li class="nav-header">Results 400mH</li>
//                                 <li><a href="https://www.atletiek.nu/wedstrijd/uitslagenonderdeel/39076/400mH/#328876_76">AC vrouwen</a></li><li><a href="https://www.atletiek.nu/wedstrijd/uitslagenonderdeel/39076/400mH/#343335_76">AC mannen</a></li>                       </div>
//                                 </div>
// </div>                                  <img src="https://www.atletiek.nu/img/bf.gif?h=7281e212b7241922e83db75a75f04d7878d1465b5bb32c9f3c706eabe51e7eca" style="display: none;">
//                                                                 </div>
//                 </div>
//
//                         </div>
//        
//        
//         <div id="content">
//                 <div id="resultateninvoer" style="display: none;">
//
//                         <div id="content_resultateninvoer">
//                        
//                         </div>
//                 </div>
//         </div>
//
//                 <div id="footer">
//                 <div class="container">
//                         <div class="row-fluid">
//                                 <div class="span12">
//                                         <h3>Atletiek.nu</h3>
//                                         <p>
//                                                 Software specially developed to improve the experience of athletics competitions.<br>
//                                                 As athletes think it should be.<br>
//                                                 Support &amp; like us on Facebook &amp; Twitter                </p>
//                                         <div class="icon">
//                                                 <span class="twitter"><a class="social-icon" target="_blank" href="http://www.twitter.com/AtletiekNu"><i class="fa fa-twitter"></i></a></span>
//                                                 <span class="facebook"><a class="social-icon" target="_blank" style="width: 50px" href="http://www.facebook.com/atletiek.nu"><i style="margin-left: 5px;margin-right: 5px;" class="fa fa-facebook"></i></a></span>
//                                                
//                                         </div>
//
//                                                 <div>
//                                                         <select class="changeSiteLanguage">
//                                                                 <option value="" data-prefix="<i class='fa fa-globe'></i> ">Change language (Change language)</option>
//                                                                                                                <option value="en">English</option>
//                                                                                                                <option value="nl">Dutch</option>
//                                                                                                                <option value="nl_BE">Flemish</option>
//                                                                                                                <option value="fr">French</option>
//                                                                                                                </select>
//                                                 </div>
//
//                                         <div class="sitemap">
//                                                 <ul>
//                                                         <li><a class="no-ajaxy" href="https://www.atletiek.nu/">Home</a></li>
//                                                         <li><a class="no-ajaxy" href="https://www.atletiek.nu/home/over/">About</a></li>
//                                                         <li><a class="no-ajaxy" href="https://www.atletiek.nu/wedstrijden/">Competitions</a></li>
//                                                         <li><a class="no-ajaxy" href="https://www.atletiek.nu/home/contact/">Contact</a></li>
//                                                         <li><a class="no-ajaxy" href="https://www.atletiek.nu/home/privacy/">Privacy declaration</a></li>
//                                                 </ul>
//                                         </div>
//                                 </div>
//                         </div>
//                 </div>
//         </div>
//         <div id="copyright">
//                 <div class="container">
//                         <div class="row-fluid">
//                                 <div class="span12">
//                                         <small>Copyright © 2011 - 2023<br><b></b>Athletics Competition Management</small>
//                                 </div>
//                         </div>
//                 </div>
//         </div>
// </div>
//
//
//         <script type="text/javascript">
//
//                 var _gaq = _gaq || [];
//                 _gaq.push(['_setAccount', 'UA-31678343-1']);
//                 _gaq.push(['_setPageGroup', 1, 'wedstrijd/uitslagenonderdeel']);
//                 _gaq.push(['_setCustomVar', 1, 'isLoggedIn', 'no' ]);
//                 _gaq.push(['_setCustomVar', 2, 'GID', '0' ]);
//                 _gaq.push(['_setCustomVar', 3, 'event_id', '39076' ]);
//                 _gaq.push(['_setCustomVar', 4, 'alltime-GID', '0', 1 ]);
//                 _gaq.push(['_trackPageview']);
//
//                 (function() {
//                         var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//                         ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//                         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//                 })();
//         </script>
//                 <div id="wordSupporter_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
//                 <div class="modal-header">
//                         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
//                         <h3 id="myModalLabel" style="text-align: center">Become Atletiek.nu supporter</h3>
//                 </div>
//                 <div class="modal-body">
//                         <div class="supporterInfo supporterInfoInModal">
//                                 Help us in the further development of the free Atletiek.nu app for everyone!<br>
//                                 <br>
//                                 <span class="features">
//                                         <i class="fa fa-check"></i> Early Access to new features in the app<br>
//                                         <i class="fa fa-check"></i> Never ads<br>
//                                         <i class="fa fa-check"></i> You help Atletiek.nu to innovate further<br>
//                                         <br>
//                                 </span>
//                                 <form action="https://www.atletiek.nu/profiel/premium/" method="post">
//                                         <button class="btn btn-success" name="startPremium" value="1" onclick="measureIwillhelp()">Become a supporter now<br><span>voor 3,99 euro p/m</span></button><br>
//                                 </form>
//                                 <br>
//                                 <b><i>Why do I suddenly see ads?</i></b><br>
//                                 Each company increases its prices as a result of increasing costs. We have never increased our prices since the establishment of Atletiek.nu and despite the fact that our costs are now increasing considerably, we do not want to increase our prices.<br>
//                                 We are therefore looking for creative other ways to continue developing and to continue to offer the best online athletics experience. Such as the launch of the athletics app!<br>
//                                 By showing advertisements, we cover most of those increased costs.<br>
//                                 <br>
//                                 <b><i>Why do we ask you to become a supporter?</i></b><br>
//                                 Do you prefer not to see advertisements, but would you like to support us innovating even faster? Then you help us by donating 3,99 euro per month as a supporter of Atletiek.nu.<br>
//                                 We never show supporters of Atletiek.nu ads, with the income of the advertisements we pay for the (further) development of the Atletiek.nu app. It is and remains free for everyone. We naturally reward supporters with a number of very cool features exclusively for them :)<br>
//                                 <br>
//                                 <b><i>Do I have to pay for Atletiek.nu or the app?</i></b><br>
//                                 Atletiek.nu the website and the app are and remain <b>free for everyone, forever</b>!<br>
//                                 <br>
//                                 <form action="https://www.atletiek.nu/profiel/premium/" method="post">
//                                         <button class="btn btn-warning" name="startPremium" value="1" onclick="measureIwillhelp()">Help now<br><span>voor 3,99 euro p/m</span></button>
//                                 </form>
//                         </div>
//                 </div>
//                 <div class="modal-footer">
//                         <button class="btn" data-dismiss="modal" aria-hidden="true" onclick="measureIwonthelp()">No, I won't help</button>
//                 </div>
//         </div>
//
//         <div class="AtletiekAppPopup">
//                 <div class="AtletiekAppPopup__overlay m-animated"></div>
//                 <div class="AtletiekAppPopup__content m-animated">
//                         <div class="AtletiekAppPopup__header">View Athletiek.nu in ...</div>
//                         <div class="AtletiekAppPopup__actions">
//                                 <div class="AtletiekAppPopup__action">
//                                         <div class="AtletiekAppPopup__imageBtnWrapper">
//                                                 <img class="atletiekapplogo" src="https://www.atletiek.nu/img/basicDesign/athletics.app logo_green_rounded.png">
//                                         </div>
//                                         <span class="AtletiekAppPopup__actionTitle">Atletiek.nu app</span>
//                                         <a class="AtletiekAppPopup__actionButton m-primary btn-open-in-app" rel="nofollow">Open</a>
//                                 </div>
//                                 <div class="AtletiekAppPopup__action">
//                                         <div class="AtletiekAppPopup__imageBtnWrapper">
//                                                 <img class="AtletiekAppPopup__chrome" style="display: none;" src="https://www.atletiek.nu/img/basicDesign/chrome.png">
//                                                 <img class="AtletiekAppPopup__safari" style="display: none;" src="https://www.atletiek.nu/img/basicDesign/safari.png">
//                                                 <img class="AtletiekAppPopup__firefox" style="display: none;" src="https://www.atletiek.nu/img/basicDesign/firefox.png">
//                                         </div>
//                                         <span class="AtletiekAppPopup__actionTitle AtletiekAppPopup__browserTitle">Safari</span>
//                                         <button class="AtletiekAppPopup__actionButton" onclick="continueInSite( 'modal_button_down' );">Continue</button>
//                                 </div>
//                         </div>
//                         <div class="AtletiekAppPopup__footer"></div>
//                 </div>
//         </div>
//
//         <script>
//                 var isEdge = /edg/i.test(navigator.userAgent);
//                 var isFirefox = !isEdge && /firefox/i.test(navigator.userAgent);
//                 var isChrome = !isEdge && !isFirefox && /chrome/i.test(navigator.userAgent);
//                 var isSafari = !isEdge && !isFirefox && !isChrome && /safari/i.test(navigator.userAgent);
//
//                 if ( isSafari )
//                 {
//                         jQuery( ".AtletiekAppPopup__safari" ).show();
//                         jQuery( ".AtletiekAppPopup__browserTitle" ).html( "Safari" );
//                 }
//                 else if ( isFirefox )
//                 {
//                         jQuery( ".AtletiekAppPopup__firefox" ).show();
//                         jQuery( ".AtletiekAppPopup__browserTitle" ).html( "Firefox" );
//                 }
//                 else
//                 {
//                         jQuery( ".AtletiekAppPopup__chrome" ).show();
//                         jQuery( ".AtletiekAppPopup__browserTitle" ).html( "Chrome" );
//                 }
//
//                 var $_GET=[];
//                 window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});
//
//                 if( /iPhone|iPad|iPod/i.test(navigator.userAgent) )
//                 {
//                         jQuery( ".btn-open-in-app" ).bind( "click", function(){
//
//                                 if ( typeof window._gaq !== 'undefined' )
//                                         window._gaq.push( ['_trackEvent', 'openInAppClicked', 'openInAppClicked-iOS', 'none'] );
//
//                                 setTimeout(function () {
//                                         setTimeout(function () {
//                                                 window.alert( "Download app in the App Store" );
//
//                                                 if ( typeof window._gaq !== 'undefined' )
//                                                         window._gaq.push( ['_trackEvent', 'downloadAppInStore', 'downloadAppInStore-iOS', 'none'] );
//
//                                                 setTimeout(function () {
//                                                         window.location = "https://www.atletiek.nu/feeder.php?page=redirect&do=appdownload";
//                                                 }, 100 );
//
//                                         }, 100 );
//                                         window.location = "atletiekapp://wedstrijd/uitslagenonderdeel/39076/400mH/";
//                                 }, 100 );
//                         } );
//                 }
//                 else
//                 {
//                         jQuery( ".btn-open-in-app" ).bind( "click", function(){
//
//                                 if ( typeof window._gaq !== 'undefined' )
//                                         window._gaq.push( ['_trackEvent', 'openInAppClicked', 'openInAppClicked-Android', 'none'] );
//
//                                 setTimeout(function () {
//                                         setTimeout(function () {
//                                                 if ( typeof window._gaq !== 'undefined' )
//                                                         window._gaq.push( ['_trackEvent', 'downloadAppInStore', 'downloadAppInStore-Android', 'none'] );
//
//                                                 setTimeout(function () {
//                                                         window.location = "https://play.google.com/store/apps/details?id=nu.atletiek.athlete";
//                                                 }, 100 );
//                                         }, 100 );
//                                         window.location = "atletiekapp://wedstrijd/uitslagenonderdeel/39076/400mH/";
//                                 }, 100 );
//                         } );
//                 }
//
//                 if ( typeof $_GET['disableapppopup'] != 'undefined' )
//                 {
//                         myStore.set( "lastShownDownloadAppPopup", Date.now());
//                         setCookie("lastShownDownloadAppPopup",Date.now(),2);
//                 }
//
//                 if ( typeof $_GET['disableapppopup'] == 'undefined' && document.documentElement.clientWidth <= 550 )
//                 {
//                         var lastShownDownloadAppPopup = Math.max( myStore.get( "lastShownDownloadAppPopup" ), getCookie( "lastShownDownloadAppPopup" ) );
//
//                         if ( lastShownDownloadAppPopup == undefined || Date.now() - lastShownDownloadAppPopup > 86400000 )
//                         {
//                                 jQuery( "body" ).addClass( "disableAds" );
//                                 jQuery( ".AtletiekAppPopup" ).addClass( "m-active" );
//                                 if ( typeof window._gaq !== 'undefined' )
//                                         window._gaq.push( ['_trackEvent', 'showDownloadAppPopup', 'showDownloadAppPopup', 'none'] );
//                         }
//                         else
//                         {
//                                 myStore.set( "lastShownDownloadAppPopup", Date.now());
//                                 setCookie("lastShownDownloadAppPopup",Date.now(),2);
//
//                                 if ( typeof window._gaq !== 'undefined' )
//                                         window._gaq.push( ['_trackEvent', 'timeLimitDownloadAppPopup', 'timeLimitDownloadAppPopup', 'none'] );
//                         }
//                 }
//         </script>
//        
// </body></html>
//
// `