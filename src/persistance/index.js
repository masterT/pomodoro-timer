import * as local from '@/persistance/engines/local'

function getPersistanceEngine () {
  // Default engine is local persistance.
  return local
}

export default getPersistanceEngine()
