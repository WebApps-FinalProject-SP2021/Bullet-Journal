const ce = React.createElement
export class MyChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
      this.state = {
          chart: null,

      };
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        if (!canvas) {
            throw Error("this shouldn't happen, canvasRef not set")
        }
        // this.componentDidUpdate();
        const ctx = canvas.getContext('2d');
        console.log("Chart Ratings : " + this.props.ratings);
        this.displayChart(ctx, this.props.ratings);
        
    }
    componentDidUpdate() {
        let dates = [];
        let dayRatings = []; 
        dates = Object.keys(this.props.ratings);
        dayRatings =  Object.values(this.props.ratings);

        const data = this.state.chart.data;
        data.labels = dates;
        data.datasets[0].data = dayRatings;
        // if (data.datasets.length > 0) {
        //     data.labels = Utils.months({count: data.labels.length + 1});
    
        //     for (var index = 0; index < data.datasets.length; ++index) {
        //     data.datasets[index].data.push(Utils.rand(-100, 100));
        //     }
    
            
        // }
        this.state.chart.update();

    }
    render() {return(
        ce("canvas", {ref: this.canvasRef})
    );}

    displayChart(ctx, ratings) 
    {
        // console.log(Object.values(ratings));
        let dates = [];
        let dayRatings = []; 
        dates = Object.keys(ratings);
        // console.log(dates);
        dayRatings =  Object.values(ratings);

        console.log("day Ratings : " + dayRatings + "dates: " + dates);
        let  myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Your Mood in the last 7 days',
                    data: dayRatings,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        this.setState({chart: myChart})
    }
    
}