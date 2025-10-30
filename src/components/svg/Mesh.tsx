export default function Mesh({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      class={className}>
      <g
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2">
        <path d="M84.171 16.36L64 37.064v64.756c0 15.129 5.043 20.171 20.171 20.171h15.128v-20.17H84.171z" />
        <path d="M94.256 36.265L28.701 101.82V73.294L94.256 6.008z" />
        <path d="M28.7 26.18v95.811h20.172V6.008z" />
      </g>
    </svg>
  )
}
