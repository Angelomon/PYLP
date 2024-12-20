#include "mpi.h"
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main(int argc, char *argv[])
{
    int rank, size;
    MPI_Init(&argc, &argv); // Inicializa el entorno MPI
    MPI_Comm_rank(MPI_COMM_WORLD, &rank); // Obtiene el rango del proceso actual
    MPI_Comm_size(MPI_COMM_WORLD, &size); // Obtiene el número de procesos totales

    // Mensaje que enviarán los procesos de sensor
    if (rank != 0) {
        // Cada proceso "sensor" genera un mensaje único
        stringstream msg;
        msg << "Mensaje desde el sensor " << rank << ": Estado OK";

        // Convertimos el mensaje en un arreglo de caracteres para enviarlo
        string message = msg.str();
        MPI_Send(message.c_str(), message.size() + 1, MPI_CHAR, 0, 0, MPI_COMM_WORLD);
        cout << "Sensor " << rank << " ha enviado su mensaje al servidor." << endl;

    } else {
        // Proceso 0 actúa como el servidor central que recibe los mensajes
        cout << "Servidor central listo para recibir mensajes..." << endl;
        for (int i = 1; i < size; i++) {
            // Buffer para recibir el mensaje de cada sensor
            char buffer[50];
            MPI_Recv(buffer, 50, MPI_CHAR, i, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
            cout << "Servidor ha recibido: " << buffer << endl;
        }
    }

    MPI_Finalize(); // Finaliza el entorno MPI
    return 0;
}