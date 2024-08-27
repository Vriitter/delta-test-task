const table = document.getElementById('myTable');
const chartContainer = document.getElementById('chartContainer');

const data = [
   { name: 'Выручка, руб', values: [500521, 480521, 4805121] },
   { name: 'Наличные', values: [300000, 300000, 300000] },
   { name: 'Безналичный расчет', values: [100000, 100000, 100000] },
   { name: 'Кредитные карты', values: [100521, 100521, 100521] },
   { name: 'Средний чек, руб', values: [1300, 900, 900] },
   { name: 'Средний гость, руб', values: [1200, 800, 800] },
   { name: 'Удаления из чека (после оплаты), руб', values: [1000, 1100, 900] },
   { name: 'Удаления из чека (до оплаты), руб', values: [1300, 1300, 900] },
   { name: 'Количество чеков', values: [34, 36, 34] },
   { name: 'Количество гостей', values: [34, 36, 32] }
];

let currentChartRow = null;

table.addEventListener('click', (event) => {
   if (event.target.tagName === 'TD') {
      const row = event.target.parentElement;
      const productName = row.querySelector('td:first-child').textContent;

      const productData = data.find(item => item.name === productName);

      if (currentChartRow) {
         currentChartRow.nextSibling.remove();
         currentChartRow = null;
      } else {
         const chartRow = document.createElement('tr');
         chartRow.style.height = '300px';

         const chartCell = document.createElement('td');
         chartCell.colSpan = 4;
         chartCell.style.padding = '0px';

         const chartDiv = document.createElement('div');
         chartDiv.style.width = '100%';
         chartDiv.style.height = '100%';
         chartDiv.id = 'chart';

         chartCell.appendChild(chartDiv);
         chartRow.appendChild(chartCell);

         row.parentNode.insertBefore(chartRow, row.nextSibling);

         setTimeout(() => {
            if (chartDiv.offsetWidth > 0) {
               Highcharts.chart('chart', {
                  chart: { type: 'line' },
                  title: 'none',
                  xAxis: {
                     categories: ['Текущий день', 'Вчера', 'Этот день недели'],
                     labels: {
                        enabled: false
                     }
                  },
                  yAxis: {
                     title: { text: '' },
                     gridLineWidth: 0,
                     lineColor: '#000',
                     lineWidth: 1,
                     labels: {
                        enabled: false
                     }
                  },
                  series: [{
                     name: '',
                     data: productData.values,
                     showInLegend: false,
                     lineWidth: 3,
                     color: '#42A43D',
                     marker: {
                        radius: 5
                     }
                  }],
               });
            }
         }, 10);
         currentChartRow = row;
      }
   }
});

