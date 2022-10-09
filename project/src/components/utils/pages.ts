import { PAGE_LIMIT } from '../../const';

function getPagesCount(cameraCount: number): number {
  return Math.ceil(cameraCount / PAGE_LIMIT);
}

export default getPagesCount;
