const table = document.getElementById('myTable');
const chartContainer = document.getElementById('chartContainer');

const data = [
   { name: 'Выручка, руб', values: [500521, 480521, 4805121]},
   { name: 'Наличные', values: [300000, 300000, 300000]},
   { name: 'Безналичный расчет', values: [100000, 100000, 100000]},
   { name: 'Кредитные карты', values: [100521, 100521, 100521]},
   { name: 'Средний чек, руб', values: [1300, 900, 900]},
   { name: 'Средний гость, руб', values: [1200, 800, 800]},
   { name: 'Удаления из чека (после оплаты), руб', values: [1000, 1100, 900]},
   { name: 'Удаления из чека (до оплаты), руб', values: [1300, 1300, 900]},
   { name: 'Количество чеков', values: [34, 36, 34]},
   { name: 'Количество гостей', values: [34, 36, 32]}
];

table.addEventListener('click', (event) => {
   if (event.target.tagName === 'TD') {
      const row = event.target.parentElement;
      const productName = row.querySelector('td:first-child').textContent;

      const productData = data.find(item => item.name === productName);

      Highcharts.chart('chartContainer', {
         chart: { type: 'line' },
         title: { text: productName },
         xAxis: { categories: ['Текущий день', 'Вчера', 'Этот день недели'] },
         yAxis: { title: { text: '' } },
         series: [{
           name: productName,
           data: productData.values
         }]
       });
   }
});