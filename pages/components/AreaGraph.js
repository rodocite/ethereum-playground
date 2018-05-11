import {
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Tooltip
} from 'recharts'

const AreaGraph = ({ data, title }) => {
  return (
    <div>
      <h1>{ title }</h1>
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="20%" stopColor="#82ca9d" stopOpacity={1}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <YAxis dataKey="amount" />
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          type="linear"
          dataKey="amount"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
          isAnimationActive={false}
        />
      </AreaChart>
    </div>
  )
}

export default AreaGraph