var __apexLocales = [
  {
    name: "en",
    options: {
      "months": ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      shortMonths: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      days: [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
      ],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      toolbar: {
        exportToSVG: "Download SVG",
        exportToPNG: "Download PNG",
        exportToCSV: "Download CSV",
        menu: "Menu",
        selection: "Selection",
        selectionZoom: "Selection Zoom",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        pan: "Panning",
        reset: "Reset Zoom"
      }
    }
  },
  {
    name: "ru",
    options: {
      months: [
        "январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "фвгуст", "сентябрь", "октябрь", "ноябрь", "декабрь"
      ],
      shortMonths: [
        "янв", "фев", "мар", "апр", "май", "июн",
        "июл", "авг", "сен", "окт", "ноя", "дек"
      ],
      days: [
        "Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота"
      ],
      shortDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      toolbar: {
        exportToSVG: "Сохранить SVG",
        exportToPNG: "Сохранить PNG",
        exportToCSV: "Сохранить CSV",
        menu: "Меню",
        selection: "Выбор",
        selectionZoom: "Выбор с увеличением",
        zoomIn: "Увеличить",
        zoomOut: "Уменьшить",
        pan: "Перемещение",
        reset: "Сбросить увеличение"
      }
    }
  }
];



var __tr = {
  locale: 'en',

  data: {
    ru: {
      mortality: 'Смертность',
      new_cases: 'Новые случаи',
      vaccination: 'Вакцинированных',
      mortality_rate: 'Коэфф. смертности',
      million_short:" млн.",
      thousand_short:" т.",
      vaccinated_per_day: 'Вакцинация чел./день',

      single_vaccination: 'Вакцинация, первичная',
      full_vaccination: 'Вакцинация, полная',
      statistics: 'Статистика', 
      summary_deaths: 'общая смертность',
			relative_deaths: 'относительная смертность',

      summary_illness: 'общая заболеваемость',
      relative_illness: 'относительная заболеваемость',
      totally_vaccinated: 'количество вакцинированных',
      percent_of_vaccinated: 'процент вакцинации',
      //fatality_rate: 'коэффициент смертности',
      person_short: 'чел.',
      data_processing: 'Обработка данных...',


    },
    en: {
      mortality: 'Mortality',
      new_cases: 'New cases',
      vaccination: 'Vaccinated',
      mortality_rate: 'Mortality rate',
      million_short: " M",
      thousand_short: " K",

      vaccinated_per_day: 'Vaccination, pers./d.',

      single_vaccination: 'Single vaccination',
      full_vaccination: 'Full vaccination',
      statistics: 'Statistics', 
      summary_deaths: 'summary deaths',
			relative_deaths: 'relative deaths',
      summary_illness: 'summary illness',
      relative_illness: 'relative illness',
      totally_vaccinated: 'totally vaccinated',
      percent_of_vaccinated: 'percent of vaccinated',
      //fatality_rate = 'case fatality rate',
      person_short: 'pers.',
      data_processing: 'Data processing...',
    }
  }
};

function __setLocale(lcl) {
  __tr.locale = lcl;
}

function __(sTrns) {
  var r = __tr.data[ __tr.locale ][sTrns] || __tr.data.en[sTrns];
  if (r === undefined)
    console.log('no translation for string "' + sTrns + '" in localeData "' +  __tr.locale + '"');
  return r || sTrns;
}
