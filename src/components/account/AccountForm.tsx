
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const accountFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  farmLocation: z.string().min(3, "Please enter a valid location"),
  farmArea: z.string().min(1, "Farm area is required"),
  areaUnit: z.enum(["acres", "hectares", "sqMeters"]),
  soilType: z.enum(["clay", "loam", "sandy", "silt", "peaty", "chalky"]),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This would be replaced with actual user data from your backend
const defaultValues: Partial<AccountFormValues> = {
  name: "John Farmer",
  contactNumber: "1234567890",
  farmLocation: "123 Farm Road",
  farmArea: "100",
  areaUnit: "acres",
  soilType: "loam",
};

export function AccountForm() {
  const { toast } = useToast();
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "Account updated",
      description: "Your account settings have been updated successfully.",
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Your contact number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="farmLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farm Location</FormLabel>
              <FormControl>
                <Input placeholder="Farm location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="farmArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Area</FormLabel>
                <FormControl>
                  <Input placeholder="Farm area" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="sqMeters">Square Meters</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="soilType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soil Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="loam">Loam</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                  <SelectItem value="peaty">Peaty</SelectItem>
                  <SelectItem value="chalky">Chalky</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
}
