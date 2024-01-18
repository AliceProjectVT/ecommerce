process.on("uncaughtException", (err, origen) => {  //captura errores no capturados
    logger.fatal(err.message)
    logger.fatal(origen)
    process.exit(1)
})
process.on(message, (err, origen) => {  //captura errores no capturados en promesas         
    logger.fatal(err.message)
    logger.fatal(origen)
    process.exit(1)
})