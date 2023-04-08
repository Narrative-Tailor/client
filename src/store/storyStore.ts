import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export interface Thumbnail {
  src: string;
  name: string;
}
export interface Chapter {
  id: number;
  title: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Story {
  id: number;
  title: string;
  description: string;
  thumbnail?: Thumbnail;
  chapters: Chapter[];
  createdAt?: Date;
  updatedAt?: Date;
}
interface StoryState {
  stories: Story[];
  addStory: (storyTitle: string, description: string, thumbnail?: File) => void;
  editStory: (id: number, title: string, description: string, thumbnail?: Thumbnail) => void;
  deleteStory: (id: number) => void;
  addChapter: (storyId: number, chapterTitle: string) => void;
  deleteChapter: (storyId: number, chapterId: number) => void;
  saveChapter: (storyId: number, chapterId: number, title: string, content: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const saveStory = (title: string, description: string, thumbnail?: File) =>
  new Promise<Story>((resolve) => {
    setTimeout(() => {
      const min = 1;
      const max = 10000;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const storyObj: Story = {
        title,
        description,
        id: randomNumber,
        chapters: [],
        thumbnail: {
          src: "data:image/jpeg;base64,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",
          name: `썸네일-${randomNumber}`,
        },
      };
      resolve(storyObj);
    }, 200);
  });

const useStoryStore = create<StoryState>()(
  devtools(
    persist(
      (set) => ({
        stories: [
          {
            id: 1,
            chapters: [],
            title: "아웃스탠딩",
            description: "아웃스탠딩 이야기",
            createdAt: new Date("2023-01-18"),
            updatedAt: new Date("2023-01-18"),
          },
          {
            id: 2,
            chapters: [],
            title: "쿠베라",
            description: "쿠베라 이야기",
            createdAt: new Date("2018-05-23"),
            updatedAt: new Date("2018-05-23"),
          },
        ],
        addStory: async (title, description, thumbnail) => {
          const newStory = await saveStory(title, description, thumbnail);

          set((state) => {
            return {
              ...state,
              stories: [...state.stories, newStory],
            };
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        editStory: (id, title, description, thumbnail) => {
          set((state) => {
            const modifiedStory = state.stories.find((story) => story.id === id);
            if (!modifiedStory) return {...state};

            modifiedStory.title = title;
            modifiedStory.description = description;
            if (thumbnail) {
              modifiedStory.thumbnail = thumbnail;
            }

            return {
              ...state,
            };
          });
        },
        deleteStory: (id) => {
          set((state) => {
            const toDeleteStoryIdx = state.stories.findIndex((story) => story.id === id);
            if (!toDeleteStoryIdx) return {...state};

            state.stories.splice(toDeleteStoryIdx, 1);

            return {...state};
          });
        },
        addChapter: (storyId, chapterTitle) => {
          set((state) => {
            const newStories = [...state.stories];

            const storyIndex = state.stories.findIndex(({id}) => id === storyId);
            if (storyIndex === -1) {
              console.error("스토리를 찾을 수 없습니다.");
              return state;
            }

            const story = newStories.splice(storyIndex, 1)[0];
            const newChapter: Chapter = {
              id: Date.now(),
              title: chapterTitle,
              content: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            story.chapters.push(newChapter);

            newStories.splice(storyIndex, 0, story);

            return {...state, stories: newStories};
          });
        },
        deleteChapter: (storyId, chapterId) => {
          set((state) => {
            const newStories = [...state.stories];

            const storyIndex = state.stories.findIndex(({id}) => id === storyId);
            if (storyIndex === -1) {
              console.error("스토리를 찾을 수 없습니다.");
              return state;
            }

            const story = newStories.splice(storyIndex, 1)[0];
            const chapterToDeleteIndex = story.chapters.findIndex(({id}) => id === chapterId);

            story.chapters.splice(chapterToDeleteIndex, 1);
            newStories.splice(storyIndex, 0, story);

            return {...state, stories: newStories};
          });
        },
        saveChapter: (storyId, chapterId, title, content) => {
          set((state) => {
            console.log(storyId, chapterId, title, content);
            const newStories = [...state.stories];

            const storyIndex = state.stories.findIndex(({id}) => id === storyId);
            if (storyIndex === -1) {
              console.error("스토리를 찾을 수 없습니다.");
              return state;
            }

            const story = newStories.splice(storyIndex, 1)[0];
            const chapter = story.chapters.find(({id}) => id === chapterId);
            if (!chapter) {
              console.error("챕터를 찾을 수 없습니다.");
              return state;
            }

            chapter.title = title;
            chapter.content = content ?? "";
            chapter.updatedAt = new Date();
            newStories.splice(storyIndex, 0, story);

            return {...state, stories: newStories};
          });
        },
      }),
      {
        name: "story-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
export default useStoryStore;
