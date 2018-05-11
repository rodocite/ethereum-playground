const Block = ({ title, block }) => {
  const { number, hash, difficulty } = block

  return (
    <div>
      <h1>{ title }</h1>
      <h5>Block Number</h5>
      <span>{ number }</span>
      <h5>Difficulty</h5>
      <span>{ difficulty }</span>
      <h4>Hash</h4>
      <span>{ hash }</span>
    </div>
  )
}

export default Block