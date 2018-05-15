/**
 * @file main actions
 * @author jhh678
 * @date 2017/7/14
 */
export const updateUserInfo = ({
  commit
}, value) => {
  commit('updateUserInfo', value)
}

export const updateTabIndex = ({
  commit
}, num) => {
  commit('updateTabIndex', num)
}
