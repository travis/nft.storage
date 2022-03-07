import { normalizeCid } from './utils/cid.js'

/**
 * Handle gateway request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function ipfsGet(request, env) {
  const cid = request.params.cid
  const reqUrl = new URL(request.url)
  const reqQueryString = reqUrl.searchParams.toString()

  // Get pathname to query from URL pathname avoiding potential CID appear in the domain
  const redirectPath = reqUrl.pathname.split(cid).slice(1).join(cid)
  const redirectQueryString = reqQueryString ? `?${reqQueryString}` : ''

  // Parse and normalize CID
  const nCid = normalizeCid(cid)
  const url = new URL(
    `https://${nCid}.${env.GATEWAY_HOSTNAME}${redirectPath}${redirectQueryString}`
  )

  return Response.redirect(url, 302)
}