function initData(){
if ( window.location.href.indexOf("kovid.loc") >= 0)
{
   var urlCSV_new_case = "/data/new_cases.csv";
   var urlCSV_deaths = "/data/time_series_covid19_deaths_global.csv";
   var urlCSV_vaccinations = "/data/vaccinations.csv";
}
else
{
   var urlCSV_new_case = "https://cdn.jsdelivr.net/gh/konsoc/konsoc@main/2021.09.10/new_cases.csv";
   var urlCSV_deaths = "https://cdn.jsdelivr.net/gh/konsoc/konsoc@main/2021.09.10/time_series_covid19_deaths_global.csv";
   var urlCSV_vaccinations = "https://cdn.jsdelivr.net/gh/konsoc/konsoc@main/2021.09.10/vaccinations.csv";
}

var generateDayWiseTimeSeries = function (baseval, count, yrange) {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = baseval;
		var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

		series.push([x, y]);
		baseval += 86400000;
		i++;
	}
	return series;
};

var apexLocales = [];
var apexCurrentLocale = $("#btn_current_locale").attr("data-locale");

$.getJSON('https://cdn.jsdelivr.net/npm/apexcharts/dist/locales/' + apexCurrentLocale +'.json', function(data) {

	Apex.chart = {
		locales: [data],
	defaultLocale: apexCurrentLocale
	};

//	apexLocales.push();
});

/*
function join(t, a, s) {
	function format(m) {
		let f = new Intl.DateTimeFormat('ru', m);
		return f.format(t);
	}
	return a.map(format).join(s);
}

let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
let s = join(new Date, a, '-');
console.log(s);
*/

var apexYformatter = function(value){
	if(value / 1000000 > 1)
		return Math.round(value/1000000) + " млн.";
	if(value / 10000 > 1)
		return Math.round(value/1000) + " т.";
	if(value / 1000 > 1)
		return Math.round(value/1000) +"." + (Math.round((value - Math.floor(value/1000)*1000)/100)) + " т.";
	if(value > 1)
		return Math.round(value);

	if(value > 0.1)
		return Math.round(value*10)/10;
	if(value > 0.01)
		return Math.round(value*100)/100;
};
var apexPercentformatter = function(value){
	return Math.round(value*100)/100 + " %";
};

var apexDeathRateFormatter = function(value){
	if(value > 1)
		return Math.round(value*100*10)/10 + " %";
	if(value > 0.1)
		return Math.round(value*100 * 100)/100 + " %";

	return Math.round(value*100 *10000)/10000 + " %";

};


var monthShort = ['янв.','фев.','мар.','апр.','мая','июн.','июл.','авг.','сен.','окт.','ноя.','дек.'];

var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// Запрашиваем день недели вместе с длинным форматом даты
var options = { year: 'numeric', month: 'short', day: 'numeric' };
// → "Donnerstag, 20. Dezember 2012"


var userLocale = function(){ return navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] ) [ 0 ] }();

var localeDayOptions = { year: 'numeric', month: 'short', day: 'numeric' };
function localeDate( value){
	var dt = new Date(value);
	return dt.toLocaleString('ru-RU', localeDayOptions);
}

var localeMonthOptions = { year: 'numeric', month: 'short', day: 'numeric'};
function formatXaxeLabel (value, timestamp /*, opts*/) {

	var dt = new Date(timestamp);
	return dt.toLocaleString('ru-RU', localeMonthOptions );

//	if(value == undefined)
//		return "wrong value";

//	return value.getDate() + " " + monthShort[value.getMonth()] + " " +
//		("0"+value.getFullYear()).slice(-2);

	//return value;
	//opts.dateFormatter(new Date(timestamp)).format("dd MMM")

}


var chartCovidOptions = {
	series: [
		{
			name: 'Смертность',
			type: 'area',
			colors: '#000',
			data: [[1584748800000,0],
				[1584835200000,4],
				[1584921600000,0],
				[1585008000000,3]
			]
		}, {
			name: 'Новые случаи',
			type: 'area',
			colors: '#000',
			data: [[1584748800000,7],
				[1584835200000,2],
				[1584921600000,3],
				[1585008000000,8]
			]
		}, {
			name: 'Вакцинированных',
			type: 'area',
			colors: '#000',
			data: [[1584748800000,11],
				[1584835200000,2],
				[1584921600000,9],
				[1585008000000,3]
			]

		},
		{
			name: 'Коэфф. смертности',
			type: 'area',
			colors: '#000',
			data: [[1584748800000,61],
				[1584835200000,7],
				[1584921600000,2],
				[1585008000000,13]
			]

		}
	],
	colors: ['#000', '#1967d2', '#34a853', '#db56eb'],
	fill:{
		type:"solid",
		colors: ['rgba(0, 0,0,0.10)', 'rgba(25, 103, 210, 0.10)', 'rgba(52, 168, 83,0.10)', 'rgba(219, 86, 213,0.10)', ]
	},

	chart: {

		id: 'summary',
		group:'covid',
		animations: {enabled: false},
		height: 350,
		width: 650,
		type: 'line',
		stacked: false,
		toolbar: {
			show: true,
			offsetX: 0,
			offsetY: 0,
			tools: {
				download: true,
				selection: true,
			},
			export: {
				svg: {
					filename: undefined,
				},
				png: {
					filename: undefined,
				},
				csv: {
					filename: undefined,
					columnDelimiter: ',',
					headerCategory: 'Дата',
				//	headerValue: 'value',
					//headerValue: 'value',
					dateFormatter: function(timestamp) {
						return localeDate(timestamp)
					}
				},
			},
			autoSelected: 'selection'
		},

		zoom: {	enabled: false	},

		selection: {
			enabled: true,
			type: 'x',
			fill: {
				color: '#e22',
				opacity: 0.2
			},
		},
		events: {
			dataPointSelection: function(event, chartContext, config)  {
		//	console.log(chartContext, config);
			}
		}
	},
	toolbar: {
		show: false
	},
	zoom: {
		enabled: false
	},
	dataLabels: {
		enabled: false
	},
	zoomable: false,
	stroke: {
		curve: 'straight',
		width: [3, 3, 3, 3]
	},
	title: {
		text: 'страна',
		align: 'left',
		offsetX: 110
	},

	xaxis: {
		type:'datetime',
		//tickAmount:4,
		labels: {
			//show: tr,
			rotate: 0,
			rotateAlways: false,
			hideOverlappingLabels: true,
			showDuplicates: false,
			trim: false,
			//minHeight: 0,	maxHeight: 120,
			style: {
				colors: [],
				fontSize: '14px',
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontWeight: 400,
				cssClass: 'apexcharts-xaxis-label',
			},
			offsetX: 0,
			offsetY: 0,
			format: undefined,
			formatter: formatXaxeLabel,
			//		datetimeUTC: true,
			datetimeFormatter: {
				year: 'yyyy',
				month: "MMM 'yy",
				day: 'dd MMM',
				hour: 'HH:mm',
			},
		},
	},
	yaxis: [
		{
			//min:-400,
			//forceNiceScale: false,
	//		show:false,
			showAlways: true,
			seriesName: 'Смертность',
			axisTicks: {
				show: false,
			},
			axisBorder: {
				show: true,
				color: '#000'
			},
			labels: {
			//	minWidth: 30,
				style: {
					colors: '#000',
				},
				formatter: apexYformatter
			},
			title: {
				style: {
					color: '#ef0000',
				}
			},
			tooltip: {
				enabled: true
			}
		},
		{
	//		show:false,
			//showAlways: true,

			min:0,
			seriesName: 'Новые случаи',
			axisTicks: {
				show: false,
			},
			axisBorder: {
				show: true,
				color: '#1967d2'
			},
			labels: {
			//	minWidth: 30,
				style: {
					colors: '#1967d2',
				},
				formatter: apexYformatter

			},
		},
		{
			//		show:false,

			//showAlways: true,
			min:0,
			opposite: true,
			seriesName: 'Вакцинация чел./день',
			//..	opposite: true,
			axisTicks: {
				show: true,
			},
			axisBorder: {
				show: true,
				color: '#34a853'
			},
			labels: {
				minWidth: 30,
				style: {
					colors: '#34a853',
				},
				formatter: apexYformatter

			},
			//title: {text: "Revenue (thousand crores)",style: {								color: '#FEB019',							}						}
		},
		{
			//		show:false,

			//showAlways: true,
			min:0,
			opposite: true,
			seriesName: 'Коэфф. смертности',
			//..	opposite: true,
			axisTicks: {
				show: true,
			},
			axisBorder: {
				show: true,
				color: '#b818cb'
			},
			labels: {
				//minWidth: 30,
				style: {
					colors: '#d94dea',
				},
				formatter: apexDeathRateFormatter
			},
		}
	],
	labels: {				},
	tooltip: {
		fi__xed: {
			enabled: true,
			position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
			offsetY: 30,
			offsetX: 60
		},
	},
	legend: {
		position: "top",
		horizontalAlign: 'left',
		offsetX: 40
	}
};
var chartSelectedCountry = new ApexCharts(document.querySelector("#chart_covid"), chartCovidOptions);
chartSelectedCountry.render();

//This method allows you to hide the visible series. If the series is already hidden, this method doesn’t affect it.

var optionsVaccinationPercent= {
	series: [{
		name: 'Вакцинация, первичная',
		data: [[0,0]]
	},
		{
			name: 'Вакцинация, полная',
			data: [	[0,0]]
		}],
	colors:['#96cfa4','#5bb974'],
	fill:{
		type:'solid',
		colors:['#96cfa4','#5bb974'],

	},

	chart: {
		animations: {enabled: false},
		id: 'vaccination',
		//	group:'covid',
		type: 'area',
		height: 150,
		width:659,
		//	background:'#743',

		toolbar: {
			show: false
		},
		zoom: {
			enabled: false,
			//autoScaleYaxis: true
		}
	},

	dataLabels: {
		enabled: false
	},
	markers: {
		size: 0,
		style: 'hollow',
	},
	yaxis: [
		{
			tickAmount:5,
			opposite: true,
			min:0,
		max:100,
		forceNiceScale: false,
		//show: false,
		showAlways: true,
		seriesName: 'Вакцинация, первичная',
		labels: {
			minWidth: 30,

			style: {
				colors: '#000',
			},
			formatter: apexPercentformatter
		},

	},{
		min:0,
		max:100,
		forceNiceScale: false,
		show: false,
		showAlways: true,
		seriesName: 'Вакцинация, полная',

		labels: {
			minWidth: 30,
			style: {
				colors: '#000',
			},
			formatter: apexPercentformatter
		},

	}],

	grid: {
		show: true,
		borderColor: undefined,
		strokeDashArray: 0,
		position: 'back',
		xaxis: {
			lines: {
				show: false
			}
		},
		yaxis: {
			lines: {
				show: false
			}
		},
		row: {
			colors: ['#ddd','#ddd'],
			opacity: 0.5
		},
		column: {
			colors: undefined,

			opacity: 0.5
		},
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
	},
	xaxis: {
		type: "datetime",
		tickAmount:4,
		labels: {
			//show: tr,
			rotate: 0,
			rotateAlways: false,
			hideOverlappingLabels: true,
			showDuplicates: false,
			trim: false,
			//minHeight: 0,	maxHeight: 120,
			style: {
				colors: [],
				fontSize: '14px',
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontWeight: 400,
				cssClass: 'apexcharts-xaxis-label',
			},
			offsetX: 0,
			offsetY: 0,
			format: undefined,
		//	formatter: formatXaxeLabel,
			//		datetimeUTC: true,
			datetimeFormatter: {
				year: 'yyyy',
				month: "MMM 'yy",
				day: 'dd MMM',
				hour: 'HH:mm',
			},
		},
	},
	tooltip: {
		x: {
			format: 'dd MMM yyyy'
		}
	}
};

var chartVaccinationPercent = new ApexCharts(document.querySelector("#chart_vaccination_percent"),
	optionsVaccinationPercent);
chartVaccinationPercent.render();

var mapDeaths = new svgMap({
	targetElementID: 'svgMapDeaths',
	countryNames: svgMapCountryNamesRU,
	data:  {
		data: {gdp: {name: '',}},
		applyData: 'gdp',
		values: {AF: {gdp: 587}}
	},
	colorMin:'#ede5da',		colorMax:'#119619',
	colorNo:'#ede5da'
});



function processTimeMidRange(arSrc, tmMax, nRng) {

	var arRet = [];

	var cntTl = 0;
	var smTl = 0;

	if(arSrc === undefined)
		arSrc = undefined;

	for (var i = arSrc.length- 1; i > 0 && tmMax < arSrc[i][0]; i--, cntTl++) {
		smTl+= arSrc[i][1];
	}

	var addTail;
//	if(i!== arSrc.length- 1)
//		addTail = [arSrc[arSrc.length - 1][0], smTl / cntTl];


	var lng = i+1;

	var ost = lng % nRng;

	smTl = 0;
	for ( i = 0; i < ost; i++) {
		smTl+= arSrc[i][1];
	}

	if(ost !== 0)
		arRet.push([arSrc[ost-1][0], smTl/ost]);

	for(i = ost; i < lng; i+=nRng)
	{
		var cnt = 0;
		smTl=0;
		for (var r = i; r < i+nRng ; r++) {
			smTl+=arSrc[r][1];
			cnt++;
		}
		arRet.push([arSrc[r-1][0], smTl/nRng]);
	}

	if(addTail !== undefined)
		arRet.push(addTail);

	return arRet;
}

function processTimeMid7Frame(arSrc) {

	var arRet = [];
	var md = 0, lBtm = 0;

	for (var i = arSrc.length - 1; i > 6; i--) {
		md = 0;
		lBtm = i - 7;
		for (r = i; r >= lBtm; r--) {
			md+=arSrc[r][1];
		}
		arRet.push([arSrc[i][0], md/7]);
	}


	for (i = 6; i >= 0; i--) {
		md = 0;
		for (var r = i; r >= 0; r--) {
			md+=arSrc[r][1];
		}

		arRet.push([arSrc[i][0], md/7]);
	}

	arRet.sort(function compare(a, b) {
		if (a[0] < b[0]) {
			return -1;
		}
		if (a[0] > b[0]) {
			return 1;
		}
		return 0;
	});

	return arRet;
}

function addNormilizedZeroes(objTimes, ar){
	for(var k in objTimes){
		if(objTimes.hasOwnProperty(k))
		{
			objTimes[k] = true;
		}
	}

	for (var i = ar.length - 1; i >= 0 ; i--) {
		objTimes[ar[i][0]] = false;
	}

	for(k in objTimes){
		if(objTimes.hasOwnProperty(k) && objTimes[k])
		{
			ar.push([parseInt(k), null])
		}
	}

}

function normilizeSeriesByTime(ar1, ar2, ar3) {

	var objTimes = {};

	var arIncm = [ar1, ar2, ar3];
	var arWrk ;
	for(var a = 0; a < 3 ; a++) {
		arWrk = arIncm[a];
		for (var i = arWrk.length - 1; i >= 0; i--) {
			objTimes[arWrk [i][0]] = true;
		}
	}

	for(a = 0; a < 3 ; a++)
	{
		arIncm[a].sort(function compare(a, b) {
			if (a[0] < b[0]) {
				return -1;
			}
			if (a[0] > b[0]) {
				return 1;
			}
			return 0;
		});
	}

	for(a = 0; a < 3 ; a++)
	{
		addNormilizedZeroes(objTimes, arIncm[a]);
	}

	for( a = 0; a < 3 ; a++) {
		arWrk = arIncm[a];
		for (i = 0 ; i < arWrk.length - 1; i++) {
			if(arWrk [i][1] == null)
				arWrk [i][1] = 0;
			else
				break;
		}
	}
}
var actChartCountryID;

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function makeDeathRate(arDth, arCs){

	var lng = arDth.length;
	var aRt = [];
	var vl = 0;

	for(var i = 0; i< lng; i++)
	{
		if(arDth[i][1] == 0 || arCs[i][1] == 0)
			vl = 0;
		else
			vl = Math.round(arDth[i][1] / arCs[i][1] * 1000)/1000;
		aRt.push([arDth[i][0], vl]);
	}

	lng -= 1;
	for( i = 0; i< lng; i++)
	{
		if(aRt[i][1] == 0 && aRt[i+1][1] == 0)
		{
			aRt[i][1] = null;
		}
		else
			break;
	}

	return aRt;
}

mapDeaths.clicked = function (countryID) {

	if (!(actChartCountryID || countryID))
		return;

	if(countryID === undefined)
		countryID = actChartCountryID;

	actChartCountryID = countryID;

	var srsDeath = [], srsNewCase = [],srsVac = [], srsDeathRate =[],
		tmGnrlMax = -1;
	elm = countriesCovid[countryID];
	
	switch($('input[name="chart_accuracy"]:checked').val()){
		case "4_round":
			if(countriesCovid[countryID].timeDeath_mid4 === undefined)
			{
				tmGnrlMax = elm.timeDeath_day[elm.timeDeath_day.length - 1][0];
				if(tmGnrlMax > elm.timeCase_day[elm.timeCase_day.length - 1][0])
					tmGnrlMax = elm.timeCase_day[elm.timeCase_day.length - 1][0];
				if(tmGnrlMax > elm.timeVacSingle_day[elm.timeVacSingle_day.length - 1][0])
					tmGnrlMax = elm.timeVacSingle_day[elm.timeVacSingle_day.length - 1][0];

				elm.timeDeath_mid4 = processTimeMidRange(elm.timeDeath_day, tmGnrlMax, 4);
				elm.timeCases_mid4 = processTimeMidRange(elm.timeCase_day, tmGnrlMax, 4);
				elm.timeVacSingle_mid4 = processTimeMidRange(elm.timeVacSingle_day, tmGnrlMax, 4);

				elm.timeDeathRate_mid4 = makeDeathRate(elm.timeDeath_mid4, elm.timeCases_mid4 );
			}
				srsDeath = countriesCovid[countryID].timeDeath_mid4;
				srsNewCase = countriesCovid[countryID].timeCases_mid4;
				srsVac = countriesCovid[countryID].timeVacSingle_mid4;
				srsDeathRate = elm.timeDeathRate_mid4;

				break;
		case "7_round":
			if(countriesCovid[countryID].timeDeath_mid7 === undefined)
			{
				tmGnrlMax = elm.timeDeath_day[elm.timeDeath_day.length - 1][0];
				if(tmGnrlMax > elm.timeCase_day[elm.timeCase_day.length - 1][0])
					tmGnrlMax = elm.timeCase_day[elm.timeCase_day.length - 1][0];
				if(tmGnrlMax > elm.timeVacSingle_day[elm.timeVacSingle_day.length - 1][0])
					tmGnrlMax = elm.timeVacSingle_day[elm.timeVacSingle_day.length - 1][0];

				elm.timeDeath_mid7 = processTimeMidRange(elm.timeDeath_day, tmGnrlMax, 7);
				elm.timeCases_mid7 = processTimeMidRange(elm.timeCase_day, tmGnrlMax, 7);
				elm.timeVacSingle_mid7 = processTimeMidRange(elm.timeVacSingle_day, tmGnrlMax, 7);

				elm.timeDeathRate_mid7 = makeDeathRate(elm.timeDeath_mid7, elm.timeCases_mid7 );
			}
				srsDeath = countriesCovid[countryID].timeDeath_mid7;
				srsNewCase = countriesCovid[countryID].timeCases_mid7;
				srsVac = countriesCovid[countryID].timeVacSingle_mid7;
				srsDeathRate = elm.timeDeathRate_mid7;

				break;
		case "7_round_frame":
			if(countriesCovid[countryID].timeDeath_mid7_frame === undefined)
			{

				elm.timeDeath_mid7_frame= processTimeMid7Frame(elm.timeDeath_day);
				elm.timeCases_mid7_frame = processTimeMid7Frame(elm.timeCase_day);
				elm.timeVacSingle_mid7_frame = processTimeMid7Frame(elm.timeVacSingle_day);

				elm.timeDeathRate_mid7_frame = makeDeathRate(elm.timeDeath_mid7_frame, elm.timeCases_mid7_frame );

			}
			srsDeath = countriesCovid[countryID].timeDeath_mid7_frame;
			srsNewCase = countriesCovid[countryID].timeCases_mid7_frame;
			srsVac = countriesCovid[countryID].timeVacSingle_mid7_frame;
			srsDeathRate = elm.timeDeathRate_mid7_frame ;

			break;
		case "as_is":

		if(countriesCovid[countryID].timeDeathRate_day === undefined)
			{
				elm.timeDeathRate_day = makeDeathRate(elm.timeDeath_day, elm.timeCase_day);
			}

			srsDeath = countriesCovid[countryID].timeDeath_day;
			srsNewCase = countriesCovid[countryID].timeCase_day;
			srsVac = countriesCovid[countryID].timeVacSingle_day;

			srsDeathRate = elm.timeDeathRate_day;

			break;
		default:
			alert("Accuracy not selected!")
	}

/*
	elm =countriesCovid[h];
	elm.dataVacSingle_total = [];
	elm.data_day = [];
	elm.dataVacFull_total = [];
	elm.dataVacFull_day = [];
	elm.data_total = [];
	elm.dataCases_day = [];
*/
	if(	(srsDeath.length !== srsNewCase.length ) ||
		(srsDeath.length !== srsVac .length)	)
		normilizeSeriesByTime(srsDeath, srsNewCase, srsVac);

	chartCovidOptions.title.text = svgMapCountryNamesRU[countryID];
	chartCovidOptions.series[0].data = srsDeath;
	chartCovidOptions.series[1].data = srsNewCase;
	chartCovidOptions.series[2].data = srsVac;
	chartCovidOptions.series[3].data = srsDeathRate ;

	if(apexLocales.length)
	{
		//chartCovidOptions.chart.locales = apexLocales;
		//chartCovidOptions.chart.defaultLocale = apexCurrentLocale;
	}

	var chk = $('#slct_chart_size option:checked');
	var chHeight = chk.attr('data-height');
	var chWidth = chk.attr('data-width');

	chartCovidOptions.chart.height = chHeight;
	chartCovidOptions.chart.width = chWidth;

	chartSelectedCountry.updateOptions (chartCovidOptions, true);

//	return;

	if(countriesCovid[countryID].timeVacSingle_percent === undefined){

		countriesCovid[countryID].timeVacSingle_percent = [];
		var sm = 0;
		var arVcSD = countriesCovid[countryID].timeVacSingle_day;
		var arVcSP = countriesCovid[countryID].timeVacSingle_percent;
		var lng = arVcSD.length;
		var nPpltn = dataCountries[countryID].population;
		for(var i = 0; i< lng; i++){
			sm+= arVcSD[i][1];
			arVcSP.push([arVcSD[i][0], Math.round(sm/nPpltn *100)]);
		}
		optionsVaccinationPercent.series[0].data = arVcSP;
	}
	else
		optionsVaccinationPercent.series[0].data = countriesCovid[countryID].timeVacSingle_percent;

	if(countriesCovid[countryID].timeVacFull_percent === undefined){

		countriesCovid[countryID].timeVacFull_percent = [];
		sm = 0;
		var arVcFD = countriesCovid[countryID].timeVacFull_day;
		var arVcFP = countriesCovid[countryID].timeVacFull_percent;

		lng = arVcFD.length;
		nPpltn = dataCountries[countryID].population;

		for(i = 0; i< lng; i++){
			sm+= arVcFD[i][1];
			arVcFP.push([arVcFD[i][0], Math.round(sm/nPpltn *100)]);
		}
		optionsVaccinationPercent.series[1].data = arVcFP;
	}
	else
		optionsVaccinationPercent.series[1].data = countriesCovid[countryID].timeVacFull_percent;

	if(apexLocales.length)
	{
		//optionsVaccinationPercent.chart.locales = apexLocales;
		//optionsVaccinationPercent.chart.defaultLocale = apexCurrentLocale;
	}

	//chartCovidOptions.chart.height = chHeight;
	optionsVaccinationPercent.chart.width = chWidth;


	chartVaccinationPercent.updateOptions (optionsVaccinationPercent, true);

	var strHtml = '<h6>Статистика - ' +  svgMapCountryNamesRU[countryID] + '</h6>';
	for(var k in dataCountries[countryID])
	{
		strHtml +='<div class="cntr_info_line row">	<div class="cntr_info_param col">' + k + ':	</div>' +
				'<div class="cntr_info_val col">' + numberWithSpaces(dataCountries[countryID][k]) +'</div></div>'
	}

	$(".country_info_container").html(strHtml);
};

var sliderDate = document.getElementById("dateRange");
// Update the current slider value (each time you drag the slider handle)

var chkRelative = document.getElementById("chk_map_relative");

//$("#slct_chart_size").detach().appendTo("#apexchartssummary");
$("#slct_chart_size").change(function() {
	mapDeaths.clicked();
});

$("#slct_map_time").change(function() {
	chageMapDate();
});

chkRelative.onclick = function() {
	chageMapDate();
};


$('input[name="chart_accuracy"]').click(function() {
	mapDeaths.clicked();
});

var countriesCovid = {};


function chageMapDate(pos) {

	var oContinents = {
		'Europe': document.getElementById("chk_map_europe").checked ? 1 : undefined,
		'Asia': document.getElementById("chk_map_asia").checked ? 1 : undefined,
	};

	if(pos === undefined)
		pos = document.getElementById("dateRange").value;

	if(!bTotal && pos < 8)
		return;

	if(pos >= countriesCovid['RUS'].timeDeath_total.length )
	{
		pos = countriesCovid['RUS'].timeDeath_total.length - 1;
	}
	
	var bTotal = $( "#slct_map_time option:selected" ).attr("data-time") === "all_time";

	var ms = dtDeathBgn.getTime() + 86400000*pos;

	$('#spnDateCurrent').html(localeDate(ms));

	var dtType = $('input[name="map_radio_data"]:checked').val();

	var clrMin ='#ede5da', clrMax = '#119619', clrNo ='#ededed';
	var sCapTotal, sCapRelatively;
	
	switch(dtType) {
		case "death":
			clrMin ='#feeeee';
			clrMax = '#a20e0e';
			sCapTotal = 'общая смертность';
			sCapRelatively = 'относительная смертность';
			break;
		case "new_case":
			clrMin ='#ecebfd';
			clrMax = '#1b17b7';
			sCapTotal = 'общая заболеваемость';
			sCapRelatively = 'относительная заболеваемость';
			break;
		case "vaccination":
			clrMin ='#ecfbe2';
			clrMax = '#428614';
			sCapTotal = 'количество вакцинированных';
			sCapRelatively = 'процент вакцинации';
			break;
		case "death_rate":
			clrMin ='#f7dafa';
			clrMax = '#871295';
			sCapRelatively = 'коэффициент смертности';
			break;
	}

	var svgMapDataDeath = {
		colorMin: clrMin ,
		colorMax:clrMax ,
		colorNo:clrNo ,
		data:{
			data: {
				totalDeaths: {
					name: sCapTotal,
					thousandSeparator: ' ',
					format: '{0} чел.'
				},
				deathPerSoul: {
					thousandSeparator: ' ',
					name: sCapRelatively,
					format: '{0} / 100 000 000 чел.'
				}
			},
			applyData: document.getElementById("chk_map_relative").checked ? 'deathPerSoul' : 'totalDeaths',
			values: {}
		}
	};

	if (dtType === 'death_rate'){
		delete svgMapDataDeath.data.data.deathPerSoul;
		svgMapDataDeath.data.applyData = 'totalDeaths';
		svgMapDataDeath.data.data.totalDeaths.format = '{0} %';
	}

	if (dtType === 'vaccination'){
		svgMapDataDeath.data.data.deathPerSoul.format = '{0} %';
	}

	var bAllContinents =  ( ! document.getElementById("chk_map_europe").checked) &&
		( ! document.getElementById("chk_map_asia").checked);


	var valMax = -1;
	var valMin = -1;
	var ttl = 0;
	for(var z in countriesCovid)
	{
		if(!countriesCovid.hasOwnProperty( z)  )
			continue;

		if((! bAllContinents) &&
			 (oContinents[dataCountries[countriesCovid[z].code3].continent] === undefined))
				continue;

		var arNm = "timeDeath_total";

		switch(dtType) {
			case "death":
				if(bTotal)
					arNm = "timeDeath_total";
				else
					arNm = "timeDeath_day";				
				break;
			case "new_case":
				if(bTotal)
					arNm = "timeCase_total";
				else
					arNm = "timeCase_day";
				break;
			case "vaccination":
				if(bTotal)
					arNm = "timeVacSingle_total";
				else
					arNm = "timeVacSingle_day";
				break;
		}

			ttl = 0;
		if (dtType === 'death_rate'){
			if(z === actChartCountryID)
				z = actChartCountryID;

			if (bTotal) {
				if( ( ! countriesCovid[z].timeCase_total[pos][1])
					|| ( ! countriesCovid[z].timeDeath_total[pos][1] ))
					ttl = 0;
				else
					ttl = countriesCovid[z].timeDeath_total[pos][1] / countriesCovid[z].timeCase_total[pos][1];

			}
			else
			{
					var ttlDth = 0, ttlCs = 0;
					for (var i = pos; i > pos - 7; i--) {
						ttlDth += countriesCovid[z].timeDeath_day[i][1];
						ttlCs += countriesCovid[z].timeCase_day[i][1];
					}

					if((ttlCs === 0) || (ttlDth === 0))
						ttl = 0;
					else
						ttl = ttlDth / ttlCs;

			}
			ttl *=100;
		}
		else {
			if (bTotal) {
				ttl = countriesCovid[z][arNm] [pos][1];
			}
			else {
				for (i = pos; i > pos - 7; i--) {
					ttl += countriesCovid[z][arNm] [i][1];
				}
				ttl /= 7;
			}
		}

		if(ttl === null)
			ttl = 0;

		if(ttl > 10)
		{
			ttl = Math.round(ttl);
		}
		else
		if(ttl> 1)
			ttl = Math.round(ttl*10)/10;
		else
		if(ttl> 0.1)
			ttl = ttl.toFixed(2);
		else
		if(ttl> 0.001)
			ttl = ttl.toFixed(4);
		else
			ttl = 0;

		if(valMax === -1)
		{
			valMax = ttl;
			valMin = ttl;
		}
		else
		{
			if(valMax < ttl)
				valMax = ttl;

			if(valMin > ttl)
				valMin = ttl;

		}
		if(ttl < 0)
			ttl = 0;

		if(dataCountries[z] === undefined )
		{
			svgMapDataDeath.data.values[countriesCovid[z].code3] = {totalDeaths: 0, deathPerSoul:0};
			continue;
		}

		if (dtType === 'death_rate'){
			svgMapDataDeath.data.values[z] = {totalDeaths: ttl};
			continue;
		}

		if (dtType === 'vaccination') {
			svgMapDataDeath.data.values[z] = {
				totalDeaths: ttl,
				deathPerSoul: Math.round(ttl / dataCountries[z].population * 1000)/10
			};
		}
		else {
			svgMapDataDeath.data.values[countriesCovid[z].code3] = {
				totalDeaths: Math.round(ttl),
				deathPerSoul: Math.round(ttl / dataCountries[countriesCovid[z].code3].population * 100000000)
			};
			//svgMapDataDeath.data.values[countriesCovid[z].code3] = {totalDeaths: 0, deathPerSoul:0};
		}
	}


	if(valMax === valMin)
		svgMapDataDeath.clrMax = svgMapDataDeath.colorMin;

	mapDeaths.options.data = {};
	mapDeaths.options = Object.assign({}, mapDeaths.options, svgMapDataDeath || {});
	mapDeaths.applyData(svgMapDataDeath.data);

}

$('input[name="map_radio_data"]').click(function() {
	chageMapDate();
});
$('.chk_map').click(function() {
	chageMapDate();
});

sliderDate.oninput = function() {
	chageMapDate(this.value );
};

var dtDeathBgn=new Date(), dtDeathEnd = new Date();

var dataDeath , dataVac, dataNewCases;
var stringDates = [], deathDates = [];

function dataLoaded(){
	if(dataDeath === undefined || dataVac  === undefined || dataNewCases  === undefined)
		return;
	var crtWrp = $("#load_wrapper");
	crtWrp.find("h3").html("Нормализация данных...");
	crtWrp.find("p").html("");
	setTimeout(parseData, 10);
}

var patternDay = /\d{1,2}\/(\d{1,2})\/\d{2}/;
var patternMonth = /(\d{1,2})\/\d{1,2}\/\d{2}/;
var patternYear  = /\d{1,2}\/\d{1,2}\/(\d{2})/;

/*
 * @return string
 */
function US2StandartTimeFormat(str){

	return t = "20" + str.replace(patternYear, "$1-") +
		("0"+str.replace(patternMonth, "$1-")).slice(-3) +
		("0"+str.replace(patternDay, "$1")).slice(-2);
}

function parseData(){


	if(dataDeath === undefined || dataVac  === undefined || dataNewCases  === undefined)
		return;
	//Province/State,Country/Region,Lat,Long,1/22/20,1/23/20,1

	countriesCovid = {};
	var g = $.csv.toArrays(dataDeath);

	var timesDeath = [0,0,0,0];
	var d;
	var strDt;

	for(var k = 4; k < g[0].length; k++)
	{
		strDt = US2StandartTimeFormat(g[0][k]);
		d =new Date(strDt );
		deathDates.push(d);
		timesDeath.push(d.getTime());
	}

	var lng;

	//read received death data
	for(i = 1; i < g.length; i++)
	{
		var g1 = g[i];
		var elm = {};
		elm.country = g1[1];
		elm.code3 = "";

		var bFnd = false;

		for(var c = 0; c < codeCountries.length; c++)
		{
			if(codeCountries[c].name === elm.country)
			{
				elm.code3 = codeCountries[c].code3;
				bFnd = true;
				break;
			}
		}
		if(!bFnd){
			continue;
		}

		elm.timeDeath_total = [];

		for(k = 4; k < g1.length; k++)
		{
			elm.timeDeath_total.push([timesDeath[k], parseFloat(g1[k])]);
		}

		if(countriesCovid[elm.code3] === undefined)
		{
			countriesCovid[elm.code3] = elm;
		}
		else
		{
			for( z = 0; z < elm.timeDeath_total.length; z++)
			{
				countriesCovid[elm.code3].timeDeath_total[z][1] += elm.timeDeath_total[z][1];
			}
		}
	}

	for(h in countriesCovid)
	{
		if(!countriesCovid.hasOwnProperty(h)  )
			continue;

		elm =countriesCovid[h];

		elm.timeDeath_day = [];
		elm.timeDeath_day.push(elm.timeDeath_total[0]);

		arD = elm.timeDeath_day;
		arT = elm.timeDeath_total;
		lng = elm.timeDeath_total.length;

		for(z = 1; z < lng; z++)
		{
			if((arT[z][1] - arT [z-1][1] ) < 0)
				arD.push([arT[z][0], Math.round(Math.max(arT[z][1] , arT [z-1][1]) - (arT[z][1] + arT [z-1][1])/2)]);
			else
				arD.push([arT[z][0], arT[z][1] - arT [z-1][1] ]);
		}
	}

	for( h in countriesCovid)
	{
		if(!countriesCovid.hasOwnProperty(h)  )
			continue;
		elm =countriesCovid[h];

		elm.timeVacSingle_total = [];
		elm.timeVacSingle_day = [];
		elm.timeVacFull_total = [];
		elm.timeVacFull_day = [];
		elm.timeCase_total = [];
		elm.timeCase_day = [];
	}


// datetime new cases processing

	{
		//date,World,2020 Summer Olympics athletes & staff,Afghanistan,Africa,Albania,Algeria

		g = $.csv.toArrays(dataNewCases);

		var lngCnt = g[0].length;
		var lngDt =  g.length;

//		dtCur = new Date(g[1][0]);

		var dayAr;

		var tmAr = [-1];

		for(var iLn = 1; iLn < g.length; iLn++) {
			tmAr.push((new Date(g[iLn][0])).getTime());
		}

		for(var iCnt = 1; iCnt < lngCnt ; iCnt++)
		{
			if(!jhuName2code3.hasOwnProperty(g[0][iCnt]))
				continue;
			iso = jhuName2code3[g[0][iCnt]];
			if(countriesCovid[iso ] === undefined)
				continue;

			dayAr = countriesCovid[iso ].timeCase_day;

			var iDt=0;
			for( iDt = 1; iDt < lngDt; iDt++)
			{
				dayAr.push([tmAr[iDt], g[iDt][iCnt] == '' ? 0 : parseFloat(g[iDt][iCnt])]);
			}
		}

		for( h in countriesCovid)
		{
			if(!countriesCovid.hasOwnProperty(h)  )
				continue;

			elm =countriesCovid[h];

			var arCT = elm.timeCase_total,
				arCD = elm.timeCase_day;

			lng = arCD.length;

			var sm = 0;

			for(r = 0; r < lng; r++)
			{
				sm += arCD[r][1];
				arCT.push([arCD[r][0], sm ]);
			}
		}
	}


	// datetime vaccination processing
	{
		// 0: location, iso_code, date,
		// 3: total_vaccinations, people_vaccinated, people_fully_vaccinated,
		// 6: daily_vaccinations_raw, daily_vaccinations, total_vaccinations_per_hundred,
		// 9: people_vaccinated_per_hundred, people_fully_vaccinated_per_hundred, daily_vaccinations_per_million

		var tm;
		var iso , vacSngl ="" , vacFull ="";
		g = $.csv.toArrays(dataVac);

		for (var i = 1; i < g.length; i++) {

			g1 = g[i];
			iso = g1[1];

			if (!countriesCovid.hasOwnProperty(iso))
				continue;

			elm = countriesCovid[iso];

			var dt = new Date(g1[2]);
			tm = dt.getTime();

			if(iso === 'CHN')
				vacSngl = g1[3];
			else
				vacSngl = g1[4];

			vacFull = g1[5];

			if (vacSngl === "")
			{
				elm.timeVacSingle_total.push([tm, -1]);
			}
			else
			{
				if(iso === 'CHN')
					elm.timeVacSingle_total.push([tm, parseFloat(vacSngl)/2]);
				else
					elm.timeVacSingle_total.push([tm, parseFloat(vacSngl)]);

			}

			if (vacFull === "")
			{
				elm.timeVacFull_total.push([tm, -1]);
			}
			else
			{
				elm.timeVacFull_total.push([tm, parseFloat(vacFull)]);
			}
		}

// check skipped dates in vaccinations

		function prepareVacTotal(arTtlVac, tmLeft, tmRight) {

			if (arTtlVac.length === 0)
				return;

			var tmFk = arTtlVac[0][0];

			//var arNewVacTtl = [];

			var arNewVacTtl = [
				[tmFk - 86400000 * 14, -1],
				[tmFk - 86400000 * 13, -1],
				[tmFk - 86400000 * 12, -1],
				[tmFk - 86400000 * 11, -1],
				[tmFk - 86400000 * 10, -1],
				[tmFk - 86400000 * 9, -1],
				[tmFk - 86400000 * 8, -1],
				[tmFk - 86400000 * 7, -1],
				[tmFk - 86400000 * 6, -1],
				[tmFk - 86400000 * 5, -1],
				[tmFk - 86400000 * 4, -1],
				[tmFk - 86400000 * 3, -1],
				[tmFk - 86400000 * 2, -1],
				[tmFk - 86400000, -1],
				[arTtlVac[0][0], arTtlVac[0][1]]
			];

			var tmBg, cnt;

			for (var i = 1; i < arTtlVac.length; i++) {

				if (arTtlVac[i][0] - arTtlVac[i - 1][0] !== 86400000) {
					cnt = (arTtlVac[i][0] - arTtlVac[i - 1][0]) / 86400000;
					//console.log(h, cnt);
					tmBg = arTtlVac[i - 1][0];

					for (var z = 1; z <= cnt; z++) {
						arNewVacTtl.push([tmBg + z * 86400000, -1]);
					}
				}
				else {
					arNewVacTtl.push([arTtlVac[i][0], arTtlVac[i][1]]);
				}
			}

			var lng = arNewVacTtl.length;

			for (i = 0; i < lng; i++) {
				if (arNewVacTtl[i][1] === -1) {
					arNewVacTtl[i][1] = 0;
				}
				else
					break;
			}

			var prevPos = i;

			// if not zeroe data
			if (prevPos !== lng)
			{
				if (arNewVacTtl[prevPos] === undefined)
					prevPos = i;

				var bsVl = arNewVacTtl[prevPos][1];
				var stp = bsVl / 14;
				var sbLng;

				// set fake smoothed values to beginning

				for (var k = 1; k < 14; k++) {
					arNewVacTtl[prevPos - k][1] = bsVl - stp * k;
				}

				// fill lacunes between known data

				for (; i < lng; i++) {

					if (prevPos === i)
						continue;

					if (arNewVacTtl[i][1] !== -1) {
						if (prevPos !== i - 1) {
							bsVl = arNewVacTtl[prevPos][1];
							sbLng = i - prevPos;
							stp = (arNewVacTtl[i][1] - bsVl) / sbLng;
							for (var r = 1; r < sbLng; r++) {

								if (arNewVacTtl[prevPos + r] === undefined)
									console.log('if(arNewVacTtl[prevPos+r] == undefined)');

								arNewVacTtl[prevPos + r][1] = bsVl + stp * r;

							}
						}
						prevPos = i;
					}
				}
			}
			// add nulls to end


			prevPos = -1;
			var lstVal = 0;

			for (i = arNewVacTtl.length - 1; i >= 0; i--) {
				if(arNewVacTtl[i][1] !== -1)
				{
					lstVal = arNewVacTtl[i][1] ;
					prevPos = i;
					break;
				}
			}

			// cut empty tail

			arNewVacTtl.length = prevPos+1;


			var tmLst = arNewVacTtl[arNewVacTtl.length -1][0];
			lng = (tmRight - tmLst) / 86400000;

			if(lng < 0){
				arNewVacTtl.length += lng;
			}
			else
			{
				if(prevPos === -1)
				{
					for (i = 1; i <= lng; i++) {
						arNewVacTtl.push([tmLst + i * 86400000, 0]);
					}
				}
				else
				{
					stp = 0;
					for (i = prevPos; i > (prevPos - 3) && i >= 0; i--) {
						stp += arNewVacTtl[i][1];
					}
					stp /= (prevPos - i);
					stp -= arNewVacTtl[i][1];
					for (i = 1; i <= lng; i++) {
						arNewVacTtl.push([tmLst + i * 86400000, lstVal + stp*i]);
					}
				}
			}

			return arNewVacTtl;
		}

		elm = countriesCovid['RUS'];

		var tmLeftMin = elm.timeCase_total[0][0],
			tmRightMin = elm.timeCase_total[elm.timeCase_total.length - 1][0];

		if(tmLeftMin > elm.timeDeath_total[0][0])
			tmLeftMin = elm.timeDeath_total[0][0];

		if(tmRightMin > elm.timeDeath_total[elm.timeDeath_total.length - 1][0])
			tmRightMin = elm.timeDeath_total[elm.timeDeath_total.length - 1][0];

		if(tmLeftMin > elm.timeVacSingle_total[0][0])
			tmLeftMin = elm.timeVacSingle_total[0][0];

		if(tmRightMin > elm.timeVacSingle_total[elm.timeVacSingle_total.length - 1][0])
			tmRightMin = elm.timeVacSingle_total[elm.timeVacSingle_total.length - 1][0];

		for (h in countriesCovid) {
			if (!countriesCovid.hasOwnProperty(h))
				continue;

			if(countriesCovid[h].timeVacFull_total.length === 0)
				continue;

			countriesCovid[h].timeVacSingle_total = prepareVacTotal(countriesCovid[h].timeVacSingle_total,
				tmLeftMin, tmRightMin);
			countriesCovid[h].timeVacFull_total = prepareVacTotal(countriesCovid[h].timeVacFull_total,
				tmLeftMin,tmRightMin);
		}

		checkTime();


		// prepare timeVacSingle_day, timeVacFull_day

		function fillVacDays(arTtl, arDay)
		{
			arDay.push([arTtl[0][0], 0]);

			var lng = arTtl.length;

			for (i = 1; i < lng; i++){
				arDay.push([arTtl[i][0],
					arTtl[i][1] - arTtl[i-1][1]])
			}
		}

		for (h in countriesCovid) {
			if (!countriesCovid.hasOwnProperty(h))
				continue;

			if(countriesCovid[h].timeVacSingle_total.length === 0)
				continue;

			fillVacDays(countriesCovid[h].timeVacSingle_total, countriesCovid[h].timeVacSingle_day);
			fillVacDays(countriesCovid[h].timeVacFull_total, countriesCovid[h].timeVacFull_day);
		}
	}


	function normilizeSeriesLength(ar, minLeft, minRight) {

		var arRet = [];
		var mxCnt =  (ar[0][0] - minLeft)/86400000;

		for(i = 0; i < mxCnt; i++)
		{
			arRet.push([minLeft + i*86400000, 0]);
		}

		for(var mxPos = ar.length - 1; ar[mxPos][0] > minRight; mxPos--) {}

		for(i = 0; i <= mxPos; i++)
			arRet.push([ar[i][0], ar[i][1]]);

		return arRet;
	}

	for(var h in countriesCovid) {
			if (!countriesCovid.hasOwnProperty(h))
				continue;

		elm = countriesCovid[h];

			if(elm.timeCase_total.length === 0 ||
				elm.timeCase_day.length === 0 ||
				elm.timeDeath_total.length === 0 ||
				elm.timeDeath_day.length === 0 ||
				elm.timeVacSingle_total.length === 0 ||
				elm.timeVacSingle_day.length === 0 ||
				elm.timeVacFull_total.length === 0 ||
				elm.timeVacFull_day.length === 0)
			{
				delete countriesCovid[h];
				continue;
			}

		elm.timeCase_total = normilizeSeriesLength(elm.timeCase_total, tmLeftMin, tmRightMin );
		elm.timeCase_day = normilizeSeriesLength(elm.timeCase_day, tmLeftMin, tmRightMin );
		elm.timeDeath_total = normilizeSeriesLength(elm.timeDeath_total, tmLeftMin, tmRightMin );
		elm.timeDeath_day = normilizeSeriesLength(elm.timeDeath_day, tmLeftMin, tmRightMin );
		elm.timeVacSingle_total = normilizeSeriesLength(elm.timeVacSingle_total, tmLeftMin, tmRightMin );
		elm.timeVacSingle_day = normilizeSeriesLength(elm.timeVacSingle_day, tmLeftMin, tmRightMin );
		elm.timeVacFull_total = normilizeSeriesLength(elm.timeVacFull_total, tmLeftMin, tmRightMin );
		elm.timeVacFull_day = normilizeSeriesLength(elm.timeVacFull_day, tmLeftMin, tmRightMin );
	}

	//set nulls to Vac beginings

	function setNullBeginning(arVac) {
		if(arVac.length === 0)
			return;

		var lng = arVac.length - 1;

		for (i = 0; i < lng; i++){
			if((arVac[i][1] === 0)  && (arVac[i+1][1] === 0))
				arVac[i][1] = null;
			else
				break;
		}

	}

	for (h in countriesCovid) {
		if (!countriesCovid.hasOwnProperty(h))
			continue;

		setNullBeginning(countriesCovid[h].timeVacSingle_total);
		setNullBeginning(countriesCovid[h].timeVacSingle_day);
		setNullBeginning(countriesCovid[h].timeVacFull_total);
		setNullBeginning(countriesCovid[h].timeVacFull_day);
	}

//check for correct dates sequence

	function checkTime( cntr){
		var arNm = ["timeCase_total",
			"timeCase_day",
			"timeDeath_total",
			"timeDeath_day",
			"timeVacSingle_total",
			"timeVacSingle_day",
			"timeVacFull_total",
			"timeVacFull_day"];

		for( h in countriesCovid) {
			if (!countriesCovid.hasOwnProperty(h))
				continue;

			if(cntr !== undefined)
				if(cntr !== h)
					continue;

			var ar;
			elm = countriesCovid[h];

			for (var a = 0; a < arNm.length ; a++) {

				ar = elm[arNm[a]];
				if(ar === undefined)
					ar = elm[arNm[a]];
				lng = ar.length - 1;
				for (var z = 0; z < lng; z++) {
					if ((ar[z][0] + 86400000) !== ar[z + 1][0])
					{
						console.log('Wrong dates sequence in ' + arNm[a] + '\n Country "' + h + '"\n' +
							'time1: ' + ar[z][0] + '\n' +
							'time2: ' + ar[z+1][0] + '\n' +
							'date1: ' + (new Date(ar[z][0]).toString()) + '\n' +
							'date2: ' + (new Date(ar[z+1][0]).toString())
						);
						break;
					}
				}
			}

		}
	}

	checkTime();


	dtDeathBgn = new Date(tmLeftMin);
	dtDeathEnd = new Date(tmRightMin);

	$('#spnDateBegin').html(localeDate(tmLeftMin));//dtDeathBgn .getDate()  + "-" + (dtDeathBgn .getMonth()+1) + "-" + dtDeathBgn .getFullYear()  );
	$('#spnDateEnd').html(localeDate(tmRightMin));//dtDeathEnd.getDate()  + "-" + (dtDeathEnd.getMonth()+1) + "-" + dtDeathEnd.getFullYear()  );

	var sliderDate = document.getElementById("dateRange");
	sliderDate.min = 0 ;
	sliderDate.max = countriesCovid['RUS'].timeVacSingle_total.length - 1;

	sliderDate.value = sliderDate.max;

	//= document.getElementById("dateRange");

	chageMapDate(sliderDate.max);
	mapDeaths.clicked('RUS');

	chartSelectedCountry.hideSeries ('Коэфф. смертности');
	
	$("#load_curtain").hide();
	var wrp = $('#curtain_body');
	wrp.css({position: 'static',	top: '0px'});

}

$.ajax({
	url: urlCSV_deaths ,
	success: function( result ) {
		dataDeath = result;
		dataLoaded( );
	},
	xhr: function()
	{
		var xhr = new window.XMLHttpRequest();
		// прогресс скачивания с сервера
		xhr.addEventListener("progress", function(evt){
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				// делать что-то...
				console.log("./data/time_series_covid19_deaths_global.csv " + Math.round(percentComplete * 100) + " %");
				$("#spn_load_mortality").html(Math.round(percentComplete * 100))
			}
		}, false);
		return xhr;
	}
});
$.ajax({
	url: urlCSV_new_case,
	success: function( result ) {
		dataNewCases = result;
		dataLoaded( );

	},
	xhr: function()
	{
		var xhr = new window.XMLHttpRequest();
		// прогресс скачивания с сервера
		xhr.addEventListener("progress", function(evt){
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				// делать что-то...
				console.log("./data/new_cases.csv " + Math.round(percentComplete * 100) + " %");
				$("#spn_load_newcases").html(Math.round(percentComplete * 100))

			}
		}, false);
		return xhr;
	}
});



$.ajax({
	url: urlCSV_vaccinations ,
	success: function( result ) {
		dataVac = result;
		dataLoaded( );
	},
	xhr: function()
	{
		var xhr = new window.XMLHttpRequest();
		// прогресс скачивания с сервера
		xhr.addEventListener("progress", function(evt){
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				// делать что-то...
				console.log("./data/vaccinations.csv " + Math.round(percentComplete * 100) + " %");
				$("#spn_load_vaccination").html(Math.round(percentComplete * 100))

			}
		}, false);
		return xhr;
	}
});


}