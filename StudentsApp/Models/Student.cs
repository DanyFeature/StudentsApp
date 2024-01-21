using System.ComponentModel.DataAnnotations;

public class Student
{
    public int Id { get; set; } // Auto-implemented, not editable by users

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }

    [Required]
    public int Age { get; set; }
}
