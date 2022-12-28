import React from 'react'
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const Charts = ({ data, chartConfig }) => {
    const [wid, setWidth] = React.useState(Dimensions.get('window').width);
    React.useEffect(() => {
        Dimensions.addEventListener('change', () => {
            setWidth(Dimensions.get('window').width);
        })
    }, [])
    console.log('Chart', data.datasets[0].data)
    return (
        <LineChart
            data={data}
            width={wid / 1.06}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    )
}

export default Charts;