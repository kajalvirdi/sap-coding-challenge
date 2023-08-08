package com.signavio

fun main() {
  val eventlogRows = CSVReader.readFile("samples/Activity_Log_2004_to_2014.csv")
  println("Processing ${eventlogRows.size} events.")

  val begin = System.currentTimeMillis()

  // TODO: Add the call to your solution here

  val end = System.currentTimeMillis()

  println("Duration: ${end - begin} milliseconds")
}
