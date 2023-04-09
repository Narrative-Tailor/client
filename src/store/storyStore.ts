import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {getBase64} from "@/utils/base64";

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
const saveStory = async (title: string, description: string, thumbnail?: File) => {
  const min = 1;
  const max = 10000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const storyMap = new Map<string, number | string | Thumbnail | Chapter[]>();
  storyMap.set("id", randomNumber);
  storyMap.set("title", title);
  storyMap.set("description", description);
  storyMap.set("chapters", []);

  if (thumbnail) {
    const thumbnailSrc = thumbnail ? await getBase64(thumbnail) : "";
    const thumbnailObj = {
      src: thumbnailSrc,
      name: `썸네일-${randomNumber}`,
    };
    storyMap.set("thumbnail", thumbnailObj);
  }

  return Object.fromEntries(storyMap.entries()) as unknown as Story;
};

const useStoryStore = create<StoryState>()(
  devtools(
    persist(
      (set) => ({
        stories: [],
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
            if (toDeleteStoryIdx === -1) return {...state};

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
