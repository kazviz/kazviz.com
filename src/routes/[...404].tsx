import { HttpStatusCode } from "@solidjs/start"
import NotFoundPage from "@page/error/404"

export default function CatchAll() {
  return (
    <>
      <HttpStatusCode code={404} />
      <NotFoundPage />
    </>
  )
}
