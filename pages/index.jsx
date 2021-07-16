import Header from '../components/Header'
import SectionContainer from '../components/SectionContainer'

export default function Home() {
  return (
    <div
      className="bg-sd-brwhite dark:bg-sd-brblack w-screen h-screen"
    >
      <>
        <SectionContainer>
          <Header />
        </SectionContainer>
      </>
    </div>
  )
}
