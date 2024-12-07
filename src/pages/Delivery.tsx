import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateDelivery } from '@/services/apiDelivery';
import { DeliveryForm } from '@/types/delivery';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
    formatCurrencyInDollars,
    formatCurrencyInSoles,
} from '../utils/formatCurrency';


export default function Delivery() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DeliveryForm>();
    const mutation = useMutation({
        mutationFn: calculateDelivery,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
            console.log(data.data);
        },
    });
    const onSubmit = (data: DeliveryForm) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) {
        <div className='flex justify-center items-center '>
            <p>Cargando...</p>
        </div>;
    }
    if (mutation.isError) {
        <div className='flex justify-center items-center '>
            {mutation.error.message}
        </div>;
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div
                className='bg-white
             p-8 rounded-lg shadow-md'>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Label htmlFor='distance' className='mb-2'>
                        Distance
                    </Label>
                    <Input
                        id='distance'
                        placeholder='Kilometros'
                        className=' w-[300px]'
                        {...register('distance', {
                            required: 'La distancia es requerida.',
                        })}
                    />
                    {errors.distance && (
                        <ErrorMessage>{errors.distance.message}</ErrorMessage>
                    )}
                    <Button variant={'default'} className='mt-5'>
                        Calcular costo
                    </Button>
                </form>
            </div>
            {mutation.isSuccess && (
                <div className='font-outfit  mt-8 bg-gray-100 p-6 shadow-md'>
                    <h3 className='text-xl'>Informaciòn del costo de kilometraje</h3>
                    <div>
                        <p className='font-medium'>
                           Distanci / kilometros:
                            <span className='font-normal'>
                                {mutation.data.data.distance} km
                            </span>
                        </p>
                        <p className='font-medium'>
                            Descuento aplicado:
                            <span className='font-normal'>
                                {mutation.data.data.discountPercent} %
                            </span>
                        </p>
                        <p className='font-medium'>
                           Descuento en dolares:
                            <span className='font-normal'>
                                {formatCurrencyInDollars(
                                    mutation.data.data.discount
                                )}
                            </span>
                        </p>
                        <p className='font-medium'>
                          Total a pagar en dolares:
                            <span className='font-normal'>
                                {formatCurrencyInDollars(
                                    mutation.data.data.costInDollars
                                )}
                            </span>
                        </p>
                        <p className='font-medium'>
                           Total a pagar en soles:
                            <span className='font-normal'>
                                {formatCurrencyInSoles(
                                    mutation.data.data.costInSoles
                                )}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
