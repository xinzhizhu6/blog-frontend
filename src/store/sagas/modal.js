import { all, delay } from 'redux-saga/effects'
import { put, spawn, takeLatest } from 'redux-saga/effects'
import { updateModalContent, updateModalVisible } from '../actions'
import TYPE from '@/common/actionTypes'

function* updateModal({ visible, content = null }) {
    // 此处区分顺序原因：隐藏 content（通常是组件）的渲染过程。其实感知不强- -
    if (visible) {
        yield put(updateModalContent(content))
        yield put(updateModalVisible(visible))
    } else {
        yield delay(300)
        yield put(updateModalVisible(visible))
        yield put(updateModalContent(content))
    }
}

function* updateModalSaga() {
    yield takeLatest(TYPE.UPDATE_MODAL, action => updateModal(action.payload))
}

export default function* modalSaga() {
    yield all([spawn(updateModalSaga)])
}
