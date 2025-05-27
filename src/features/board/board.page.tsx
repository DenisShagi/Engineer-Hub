import type { PathParams, ROUTES } from '@/shared/model/routes'
import { useParams } from 'react-router-dom'

function BoardPage() {

  const params = useParams<PathParams[typeof ROUTES.BOARD]>()
  return (
    <div>

      <p>Board page {params.boardId}</p>
    </div>
  );
}

export const Component = BoardPage;
