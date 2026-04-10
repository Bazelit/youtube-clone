import { HomeScreen } from "@/screen/HomeScreen";
import { GetAllVideosDto } from "@/shared/types/types-from-backend";

export default async function HomePage() {
  try {
    const dataFromServer = await fetch("http://localhost:3000/api/videos", {
      method: "GET",
    });

    const response = (await dataFromServer.json()) as GetAllVideosDto;

    return <HomeScreen data={response.data} />;
  } catch (error) {
    console.error(error);
    return <div>Что-то пошло не так</div>
  }
}
