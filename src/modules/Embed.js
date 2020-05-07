/**
 * Create, send, edit Discord embeds.
 * @module modules/Embed
 */

/**
 * Creates a custom embed
 * @param {Discord.Message} message - The message of the embed
 * @param {string} title - The title of the embed
 * @param {string} desc - The description of the embed
 * @param {object} fields - The fields of the embed (optional)
 * @param {string} thumbnail - The URL for the thumbnail of the embed
 * @param {string} image - The URL for the image of the embed
 * @param {string} color - The HEX color code of the embed
 * @param {object} files - The files attached alongside the embed
 * @param {boolean} code - If set to true all the fields along with the description will be surrounded by code blocks
 * @param {boolean} inline - Should all the fields be inlined by default (set to true by default)
 */
exports.create = (message, { title, desc, fields, thumbnail, image, color, files, code, inline = true }) => {
  if ((code !== undefined || code) && fields !== undefined) {
    for (const field of fields) {
      if (field.code !== undefined && !field.code) { continue }
      field.value = `\`\`\`${typeof code === 'string' ? code : ''}\n${field.value}\`\`\``
    }
  }

  if (inline && fields !== undefined) {
    for (const field of fields) {
      field.inline = true
    }
  }

  return {
    embed: {
      title: title,
      description: Array.isArray(desc) ? desc.join('\n') : desc,
      footer: {
        text: `${message.author.tag} (${message.author.id}) <${message.content.slice(0, 20)}${message.content.length > 20 ? '...' : ''}>`,
        icon_url: message.author.avatarURL()
      },
      thumbnail: {
        url: thumbnail
      },
      image: {
        url: image
      },
      color: color,
      timestamp: new Date(),
      fields: fields,
      files: files
    }
  }
}

/**
 * Send a custom embed
 * @param {Discord.Message} message - The message of the embed
 * @param {string} title - The title of the embed
 * @param {string} desc - The description of the embed
 * @param {object} fields - The fields of the embed (optional)
 * @param {string} thumbnail - The URL for the thumbnail of the embed
 * @param {string} image - The URL for the image of the embed
 * @param {string} color - The HEX color code of the embed
 * @param {object} files - The files attached alongside the embed
 * @param {boolean} code - If set to true all the fields along with the description will be surrounded by code blocks
 * @param {boolean} inline - Should all the fields be inlined by default (set to true by default)
 */
exports.send = async (message, { title, desc, fields, thumbnail, image, color, files, code, inline }) => {
  if (!message.guild.me.hasPermission('EMBED_LINKS')) {
    await message.channel.send('I need the `EMBED_LINKS` permission.')
    return
  }
  const m = await message.channel.send(this.create(message, { title, desc, fields, thumbnail, image, color, files, code, inline }))
  return m
}

/**
 * Edit a custom embed
 * @param {Discord.Message} message - The message of the embed
 * @param {string} title - The title of the embed
 * @param {string} desc - The description of the embed
 * @param {object} fields - The fields of the embed (optional)
 * @param {string} thumbnail - The URL for the thumbnail of the embed
 * @param {string} image - The URL for the image of the embed
 * @param {string} color - The HEX color code of the embed
 * @param {object} files - The files attached alongside the embed
 * @param {boolean} code - If set to true all the fields along with the description will be surrounded by code blocks
 * @param {boolean} inline - Should all the fields be inlined by default (set to true by default)
 */
exports.edit = async (message, msg, { title, desc, fields, thumbnail, image, color, files, code, inline }) => {
  if (!message.guild.me.hasPermission('EMBED_LINKS')) {
    await message.channel.send('I need the `EMBED_LINKS` permission.')
    return
  }
  const m = await msg.edit(this.create(message, { title, desc, fields, thumbnail, image, color, files, code, inline }))
  return m
}

/**
 * Send a embed in debug format
 * @param {Discord.Message} message = The message of the embed
 * @param {string} content = The description of the embed
 */
exports.debug = async (message, content) => {
  if (!message.guild.me.hasPermission('EMBED_LINKS')) {
    await message.channel.send('I need the `EMBED_LINKS` permission.')
    return
  }
  const m = await message.channel.send(this.create(message, {
    desc: `\`\`\`${content}\`\`\``
  }))
  return m
}

/**
 * Send a embed in error format
 * @param {Discord.Message} message = The message of the embed
 * @param {Error} error = The error
 * @param {string} content = A helpful message appended to the beginning of the description
 */
exports.error = async (message, error, content = '') => {
  if (!message.guild.me.hasPermission('EMBED_LINKS')) {
    await message.channel.send('I need the `EMBED_LINKS` permission.')
    return
  }
  const m = await message.channel.send(this.create(message, {
    desc: [content, '```js', `${error.name}: ${error.message}`, '```']
  }))
  return m
}
