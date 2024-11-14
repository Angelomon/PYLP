#include "mpi.h"
#include <iostream>
using namespace std;

int main(int argc, char *argv[])
{
    int rank, size, message;

    MPI_Init(&argc, &argv);                 // Inicialización del entorno MPI
    MPI_Comm_size(MPI_COMM_WORLD, &size);    // Número de procesos en el comunicador global
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);    // Rango (identificador) del proceso en el comunicador global

    if (rank == 1) {
        // El primer proceso envía su rango al siguiente
        message = rank;
        MPI_Send(&message, 1, MPI_INT, rank + 1, 0, MPI_COMM_WORLD);
        cout << "Soy el proceso " << rank << " y he enviado mi rango al proceso " << rank + 1 << endl;
    } else {
        // Cada proceso recibe el mensaje del anterior
        MPI_Recv(&message, 1, MPI_INT, rank - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        cout << "Soy el proceso " << rank << " y he recibido " << message << endl;

        // Y, si no es el último, envía su rango al siguiente
        if (rank < size - 1) {
            message = rank;
            MPI_Send(&message, 1, MPI_INT, rank + 1, 0, MPI_COMM_WORLD);
            cout << "Soy el proceso " << rank << " y he enviado mi rango al proceso " << rank + 1 << endl;
        }
    }

    MPI_Finalize();
    return 0;
}
