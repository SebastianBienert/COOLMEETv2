import ContentLoader from 'react-content-loader'

export const LineLoader = (width, height) => (
    <ContentLoader>
      <rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
    </ContentLoader>
  )