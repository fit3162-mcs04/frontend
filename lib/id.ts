import baseX from "base-x"

const b58 = baseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

const prefixes = {
  user: "user",
  session: "sess",
  account: "acct",
  verification: "vert",
  jwks: "jwks",
  project: "proj",
  result: "res",
  model: "mod",
  data: "data",
}

export function newId<TPrefix extends keyof typeof prefixes>(prefix: TPrefix) {
  const buf = crypto.getRandomValues(new Uint8Array(15))

  const EPOCH_TIMESTAMP = 1_700_000_000_000

  const t = Date.now() - EPOCH_TIMESTAMP

  buf[0] = (t >>> 24) & 255
  buf[1] = (t >>> 16) & 255
  buf[2] = (t >>> 8) & 255
  buf[3] = t & 255

  return `${prefixes[prefix]}_${b58.encode(buf)}` as const
}
