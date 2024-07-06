import { create } from 'zustand'

export interface UserItem {
  username: string
  nickname: string
}

type State = {
  username: string
  nickname: string
}

type Action = {
  login: (user: UserItem) => void
  logout: () => void
}

export const useUserStore = create<State & Action>((set) => ({
  username: '',
  nickname: '',
  login: (user: UserItem) => {
    set({
      username: user.username,
      nickname: user.nickname,
    })
  },
  logout: () => {
    set({
      username: '',
      nickname: '',
    })
  },
}))
