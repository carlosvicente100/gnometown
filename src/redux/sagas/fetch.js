import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchGeneric } from '../../utils/fetch'
import { fetchRequested } from '../types'

export function* fetchData({ url, fetchSucceeded, fetchPending, fetchFailed }) {
  try {
    yield put({ type: fetchPending })
    const data = yield call(fetchGeneric, url)
    yield put({ type: fetchSucceeded, data })
  } catch (error) {
    yield put({ type: fetchFailed })
  }
}

export default function* fetchFromUrl() {
  yield takeEvery(fetchRequested, fetchData)
}
