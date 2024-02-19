import { Card, CardContent } from "@mui/material"
import { LineChart } from "@mui/x-charts"

function TempChart(props) {

    function vectorY(arr) {
        return arr.map((item) => {
            return Math.floor(item.temp_c)
        })
    }

    function vectorX(arr) {
        const filtered = arr.filter((item) => {
            if (new Date().getHours() <= new Date(item.time).getHours()) {
                return item
            }
        })

        const mapped = filtered.map((item) => {
            return new Date(item.time)
        })

        if (mapped.length < 24) {
            const plusDate = arr.map((item) => {
                return new Date(new Date(item.time).setDate(new Date(item.time).getDate() + 1))
            })
            return [...mapped, ...plusDate].slice(0, 24)
        }
        return mapped
    }

    return (
        <Card  >
            <CardContent sx={{ p: 0, height: 264.094 }}>
                {/* <SparkLineChart
                    data={vectorY(props.info.forecast.forecastday[0].hour)}
                    xAxis={{
                        scaleType: 'time',
                        data: vectorX(props.info.forecast.forecastday[0].hour)

                        // vectorX(props.info.forecast.forecastday[0].hour),
                        // valueFormatter: (value) => value.toISOString().slice(0, 10),
                    }}
                    showTooltip
                    showHighlight
                    curve="catmullRom"
                // exclusive
                // area
                // height={200}
                /> */}
                <LineChart
                    xAxis={[{ scaleType: 'time', valueFormatter: (date) => date.getHours().toString() + ':00', data: vectorX(props.info.forecast.forecastday[0].hour) }]}
                    series={[
                        {
                            data: vectorY(props.info.forecast.forecastday[0].hour), showMark: false, valueFormatter: (temp) => temp + 'ºC', color: '#a6d4fa'
                        },
                    ]}
                // width={500}
                // height={264.094}
                // curve="catmullRom"
                />
            </CardContent>
        </Card>
    )
}

export default TempChart