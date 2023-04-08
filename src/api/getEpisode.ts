import axios, {AxiosResponse} from "axios";

export interface EpisodeRequest {
  genre: string;
  when: string;
  where: string;
  who: string;
  what: string;
  why: string;
  how: string;
}

export interface EpisodeResponse {
  result: string;
}
export const getEpisode = async (data: EpisodeRequest) => {
  return {
    result:
      "제가 쓴 소설은 아래와 같습니다.\n\n언제 : 세기 전반기\n\n어디서 : 작은 마을의 편의점\n\n누가 : 편의점 주인(청년), 손님(중년)\n\n무엇을 : 편의점 청소\n\n왜 : 청소 중에 일어난 대화\n\n어떻게 : \n\n청년 : (꼼꼼하게 청소하고 있는데, 중년 고객이 들어오며 인사한다) 안녕하세요! 오늘도 잠시 쉬러 오신 건가요?\n\n중년 : 네, 그래도 아이스크림 한 개 주세요. (고객은 카운터로 다가와 요청을 한다)\n\n청년 : (아이스크림을 꺼내며) 이 아이스크림, 참 좋은 제품이에요. 제가 매일 먹기도 해요.\n\n중년 : 그러게요? 그럼 맛있겠군요. (아이스크림을 받으며 찬찬히 바라보며) 그런데, 청소는 어떻게 하시나요? 정말 깔끔하네요.\n\n청년 : (아이스크림을 옮기며) 그러게요. 청소는 이곳을 내 집처럼 생각해서 하고 있어요. 언제나 깨끗하고 편안한 공간으로 유지하려고 노력하고 있어요.\n\n중년 : (흥미롭게 듣고) 그럼, 이곳은 정말 좋은 공간이 되었군요. 혹시 경험이 있으신가요? 다른 분야에서 경험을 쌓고 오신 건가요?\n\n청년 : (솔직하게 대답하며) 아뇨, 제가 막 대학을 졸업해서 창업한 가게인데요. 그래서 제 자신이 최선을 다해서 이 곳을 관리하고 있어요.\n\n중년 : (칭찬을 하며) 보기에도 정말 열심히 하고 계시는 것 같네요. 고생 많으세요.\n\n청년 : (고객한테 인사를 하며) 감사합니다. 다음에 또 방문해주세요!\n\n이처럼 편의점에서의 청소와 고객과의 대화로 편의점 주인이 성실하고 열심히 일하는 모습을 보여주고, 고객은 일상적인 소통으로 편안함과 친근함을 느끼게 되는 이야기입니다.",
  };
  // const response = await axios.post<string, AxiosResponse<EpisodeResponse>>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/get-5W1H`,
  //   data,
  // );
  // return response.data;
};
