export const tmplReplace = (tmpl: string, data: any) => {
  return tmpl.replace(/\$\{(\w+)\}/g, (_, key) => data[key])
}
