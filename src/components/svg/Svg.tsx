export function Svg(props: { fragments: SVGFragment[]; style?: string }) {
  return (
    <svg viewBox="0 0 24 24" style={props.style}>
      {props.fragments.map((fragment) => (
        <path d={fragment.path} style={fragment.style} />
      ))}
    </svg>
  )
}
